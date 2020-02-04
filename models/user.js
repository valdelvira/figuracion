const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: true,   //parametro unico en la bbdd
        minlength: 3,
        maxlength: 15
    },
    password: { //Añdir validación de letras caracteres etc
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User