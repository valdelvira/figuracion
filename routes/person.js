const mongosee = require('mongoose')
mongosee.set('useFindAndModify', false);
const express = require('express')
const Person = require('../models/person') //Importo el modulo de personas
const router = express.Router() //Importo el modulo para enrutar las paginas
const { check, validationResult } = require('express-validator')

router.post('/', [
    check('email').isEmail()
    ],
    async(req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
        const person = new Person({
            name: req.body.name,
            fisrtSurname: req.body.fisrtSurname,
            lastSurname: req.body.lastSurname
        })
        const result = await person.save()
        res.status(201).send(result)
    }

)

router.get('/', async(req,res) => {
    const personAll = await  Person.find()
    res.send(personAll)
})

router.get('/:id', async(req,res) => {
    try {
        const person = await Person.findById(req.params.id)
        res.send(person)
    } catch (e) {
        res.status(404).send({error: 'Persona no encontrada: ' + e })
    }
})

router.patch('/:id', async(req, res) => {
    try {
        const filter = { _id: req.params.id}
        const update = { name: req.body.name, fisrtSurname: req.body.fisrtSurname , lastSurname: req.body.lastSurname}
        let person = await Person.findOneAndUpdate(filter, update)
        res.send('Nuevo: ' + person)
    }catch (e) {
        res.status(404).send({error: 'Error al actualizar el registro: ' + e })
    }
})

router.delete ('/:id', async(req,res) => {

})

module.exports = router