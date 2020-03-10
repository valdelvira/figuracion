const express = require('express')
const router = express.Router()
const Company = require('../models/companys')
const { User } = require('../models/user')
const auth = require('../middleware/auth')  //Para ver si tiene acceso
const authorization = require('../middleware/role') //Para comprobar el rol del usuario
const Role = require('../helpers/role')
const { check, validationResult } = require('express-validator')
const upload = require('../middleware/file')

router.post('/upload', upload.single('image'), [auth, authorization([Role.Admin, Role.User])], [check('email').normalizeEmail().isEmail()],
    async(req, res) => {
        try{
            const url = req.protocol + '://' + req.get('host') // Construyo la url
            let imageURL = null
            req.file ? imageURL = url + '/public/' + req.file.filename : imageURL = null            
            const company = new Company({
                name: req.body.name,
                field: req.body.field,
                description: req.body.description,
                imageURL: imageURL
            })
            const result = await company.save()
            res.status(201).send(result)
        }catch(e){
            res.status(404).send({message: 'Error al dar de alta: ' + e})
        }

    }
)

// Incluyo la validación y la comprobación de permisos
router.get('/list', [auth, authorization([Role.Admin, Role.User, Role.Viewer])], async(req,res) => {
    
    const companiesAll = await  Company.find()
    res.send(companiesAll)
})

router.delete ('/:id', [auth, authorization([Role.Admin, Role.User])], async(req,res) => {
    try{
            // Recibo por parámetro el id de la persona a borrar
        const company = await Company.findByIdAndDelete(req.params.id)
        if(!company) return res.status(404).send('La empresa no existe '+ company)
        res.status(201).send({message: 'Empresa borrada de la base de datos'})
    } catch (e) {
        res.status(404).send({error:'Error, al intentar borrar.'})
    }
})

    module.exports = router