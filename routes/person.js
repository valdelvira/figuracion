const mongosee = require('mongoose')
const express = require('express')
const Person = require('../models/person') //Importo el modulo de personas
const router = express.Router() //Importo el modulo para enrutar las paginas
const { check, validationResult } = require('express-validator')

router.post('/', [
    // check('email').isEmail()
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
module.exports = router