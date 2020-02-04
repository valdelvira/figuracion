const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {check, validationResult} = require('express-validator')

router.post('/', [ 
    //Validación de datos
    check('user', 'Complete el campo').exists().trim().isLength({min: 3, max: 15}),
    check('password', 'Introduzca una contraseña').exists().isLength({min: 6, max: 20}) 
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

    try{
        //Comprobación de credenciales
        let user = await User.findOne({user: req.body.user})
        if(!user) return res.status(404).send('Usuario o contraseña incorrectos')
        //Comparación de clave entexto plano del usuario con la encriptada en servidor
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(404).send('Usuario o contraseña incorrectos')
        
        //Generación de token
        const jwToken = jwt.sign({_id: user._id, user: user.user}, 'clavePrivada')
        res.send(jwToken)

    }catch(e){
        res.status(404).send({message: 'Error: ' + e})

    }

})

module.exports = router