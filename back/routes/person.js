const mongosee = require('mongoose')
mongosee.set('useFindAndModify', false);
const express = require('express')
const Person = require('../models/person') //Importo el modulo de personas
const auth = require('../middleware/auth')  //Para ver si tiene acceso
const authorization = require('../middleware/role') //Para comprobar el rol del usuario
const Role = require('../helpers/role')
const router = express.Router() //Importo el modulo para enrutar las paginas
const { check, validationResult } = require('express-validator')
const { User } = require('../models/user')
const upload = require('../middleware/file')

// POST con solo datos texto   
router.post('/', [auth, authorization([Role.Admin, Role.User])], [check('email').normalizeEmail().isEmail()],
    async(req,res) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
            const person = new Person({
                userId: req.user._id,
                name: req.body.name,
                firstSurname: req.body.firstSurname,
                lastSurname: req.body.lastSurname,
                email: req.body.email,
                status: "Desempleado"
            })
            const result = await person.save()
            res.status(201).send(result)
        } catch (e) {
            res.status(404).send({error: 'Error al actualizar el registro: ' + e })
        }
    }
)

// POST con fotos. Ojo en Postman hay q enviar todos los parametros por body/form-data
router.post('/upload', upload.single('image'), [auth, authorization([Role.Admin, Role.User])], [check('email').normalizeEmail().isEmail()],
    async(req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') // Construyo la url
            let imageURL = null
            req.file ? imageURL = url + '/public/' + req.file.filename : imageURL = null
            const person = new Person({
                userId: req.user._id,
                name: req.body.name,
                firstSurname: req.body.firstSurname,
                lastSurname: req.body.lastSurname,
                email: req.body.email,
                status: "Desempleado",
                imageURL: imageURL
            })     
            const result = await person.save()   
            res.status(201).send(result)
        } catch (e) {
            res.status(404).send({error: 'Error al actualizar el registro: ' + e })
        }
    }
) 

// Incluyo la validación y la comprobación de permisos
router.get('/list', [auth, authorization([Role.Admin, Role.User, Role.Viewer])], async(req,res) => {
    
    const personAll = await  Person.find()
    res.send(personAll)
})

router.get('/:id', [auth, authorization([Role.Admin, Role.User, Role.Viewer])], async(req,res) => {
    try {
        const person = await Person.findById(req.params.id)
        res.send(person)
    } catch (e) {
        res.status(404).send({error: 'Persona no encontrada: ' + e })
    }
})


router.patch('/:id', [auth, authorization([Role.Admin, Role.User])], async(req, res) => {
    try {
        const filter = { _id: req.params.id}
        const update = { name: req.body.name, fisrtSurname: req.body.fisrtSurname , lastSurname: req.body.lastSurname}
        let person = await Person.findOneAndUpdate(filter, update)
        res.send('Nuevo: ' + person)
    }catch (e) {
        res.status(404).send({error: 'Error al actualizar el registro: ' + e })
    }
})

router.delete ('/:id', [auth, authorization([Role.Admin, Role.User])], async(req,res) => {
    try{
            // Recibo por parámetro el id de la persona a borrar
        const person = await Person.findByIdAndDelete(req.params.id)
        if(!person) return res.status(404).send('La persona no existe '+ person)
        res.status(201).send({message: 'Persona borrada de la base de datos'})
    } catch (e) {
        res.status(404).send({error:'Error, al intentar borrar.'})
    }
})

module.exports = router