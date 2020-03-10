const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

///  ***********************************               API/GET         ///
// API lista todos los usuarios
router.get('/list', async(req, res) => {
    try{
        const user = await User.find()
        res.status(200).send(user)
    }catch(e){
        res.status(404).send({message: 'Error: ' + e})
    }
})
//API busca un usuario por id
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user)  return res.status(404).send('Usuario desconocido')
        res.status(200).send(user)
    }catch(e){
        res.status(404).send({message: 'Error: ' + e})
    }
})


///  ***********************************               API/POST         ///
//API crea nuevo usuario
router.post('/', [ 
    //Validación de datos
    check('user', 'Complete el campo').exists().trim().isLength({min: 3, max: 15}),
    check('email', 'Escriba un email válido').exists().isEmail(),
    check('password', 'Introduzca una contraseña (min 6 y max 20)').exists().isLength({min: 6, max: 20})
    ,
    check('passwordConfir', 'La contraseña no coincide con el campo confirmación de contraseña')
        .exists()
        .custom((value, { req }) => value === req.body.password)
], 
    async (req, res) => {
        const error = validationResult(req) //Recojo el resultado de la validación
        if(!error.isEmpty()){
            return res.status(422).send({ errors: error.array() })
        }

        try{
            //Compruebo si existe el usuario
            let user = await User.findOne({ user: req.body.user})
            if(user) return res.status(404).send('El usuario ya existe')
            user = await User.findOne({ user: req.body.email})
            if(user) return res.status(404).send('El usuario ya existe')

            //Encryptación de contraseña
            const salt = await bcrypt.genSalt(12)
            const hashPassword = await bcrypt.hash(req.body.password, salt) 

            user = new User ({
                user: req.body.user,
                password: hashPassword,
                email: req.body.email,
                role: req.body.role
            })

            //Guardo el nuevo usuario
            const result = await user.save()
            //Invoco el método del esquema que genera el token
            const jwToken = user.generateJWT()
            //Adjunto en la cabecera el token
            // res.status(201).head('Authorization', jwToken).send({
            //     _id: user._id,
            //     user: user.user,
            //     email: user.email,
            //     message: 'Usuario registrado correctamente'
            // })
            res.status(201).send({jwToken})
        }catch(e){
            res.status(404).send({message: 'Error: ' + e})
        }
})

///  ***********************************               API/PUT         ///
//API actualiza usuario
router.put('/:id', [ 
    //Validación de datos
    check('user', 'Complete el campo').exists().trim().isLength({min: 3, max: 15}),
    check('email', 'Escriba un email válido').exists().isEmail(),
    check('password', 'Introduzca una contraseña').exists().isLength({min: 6, max: 20}) 
],
    async(req, res) => {
        const error = validationResult(req)
        if(!error.isEmpty()) return res.status(404).send({ error: error.array() })

        try{
            //Encryptación de contraseña
            const salt = await bcrypt.genSalt(12)
            const hashPassword = await bcrypt.hash(req.body.password, salt) 
            const user = await User.findByIdAndUpdate( req.params.id, {
                user: req.body.user,
                email: req.body.email,
                password: hashPassword
            },
            {
                new: true   //Indica que queremos que nos devuelva el nuevo documento
            })
            if(!user) return res.status(404).send('Usuario no encontrado')

            res.status(404).send('Usuario actualizado: ' + user.user)
        }catch(e){
            res.status(404).send({message: 'Error: ' + e})
        }
})


///  ***********************************               API/DELETE         ///
//API elimina usuario
router.delete('/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send('Usuario no encontrado')
        res.status(200).send('Usuario borrado correctamente')
    }catch(e){
        res.status(404).send({message: 'Error: ' + e})
    }
})

module.exports = router