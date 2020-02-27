const mongoose = require('mongoose')


const companySchema = new mongoose.Schema({
    name:{
        type: String
    },
    field:{
        type: String
    },
    description:{
        type: String
    },
    imageURL:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Company = mongoose.model('company', companySchema)
module.exports = Company