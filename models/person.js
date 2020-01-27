const mongosee = require('mongoose')

const personSchema = new mongosee.Schema({
    name:{
        type: String,
        required: true
    },
    fisrtSurname:{
        type: String,
        required: true
    },
    lastSurname:{
        type: String,
        required: true
    }
    // birth: {
    //     type: Date,
    //     min: 01/01/1910,
    //     max: Date.now
    // },
    // dni:{
    //     type: String,
    //     validate: {
    //         validator: function(v) {
    //           return /^([0-9]{8}[A-Z])|[XYZ][0-9]{7}[A-Z]$/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid ID!`
    //       }
    // },
    // nie: String,
    // segSocial: Number,
    // sex: {
    //     type: String,
    //     required: true,
    //     enum: ['male', 'female']
    // },
    // adress: String,
    // city: String,
    // country: String,
    // state: String,
    // email: {
    //     type: String,
    //     validate: {
    //         validator: function(v) {
    //         return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid email!`
    //     }
    // },
    // zip: Number,
    // phone: {
    //     type: Number,
    //     validate: {
    //       validator: function(v) {
    //         return /+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/.test(v);
    //       },
    //       message: props => `${props.value} is not a valid phone number!`
    //     },
    //     required: [true, 'User phone number required']
    //   },
    // mobile: {
    //     type: Number,
    //     validate: {
    //       validator: function(v) {
    //         return /+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/.test(v);
    //       },
    //       message: props => `${props.value} is not a valid phone number!`
    //     },
    //     required: [true, 'User phone number required']
    //   },
    // otherPhone: {
    //     type: Number,
    //     validate: {
    //       validator: function(v) {
    //         return /+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/.test(v);
    //       },
    //       message: props => `${props.value} is not a valid phone number!`
    //     },
    //     required: [true, 'User phone number required']
    //   }
})

const Person = mongosee.model('person', personSchema) // Creo una instancia con el modelo del esquema creado

module.exports = Person //Exporto el modulo