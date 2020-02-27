const express = require('express')
const router = express.Router()
const Company = require('../models/companys')
const { User } = require('../models/user')


router.post('/',
    async(req, res) => {
        try{
            const company = new Company({
                name: req.body.name,
                field: req.body.field,
                description: req.body.description
            })
            const result = await company.save()
            res.status(201).send(result)
        }catch(e){
            res.status(404).send({message: 'Error: ' + e})
        }

    })

    module.exports = router