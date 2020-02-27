const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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
    role: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

    //Creo un método al que puedo llamar para generar un token
userSchema.methods.generateJWT = function (){
    return jwt.sign({
        _id: this._id, 
        user: this.user,
        email: this.email,
        role: this.role
    }, process.env.SECRET_KEY_JWT_PERSON_API)
} 
    

const User = mongoose.model('user', userSchema)
module.exports = User
module.exports.userSchema = userSchema