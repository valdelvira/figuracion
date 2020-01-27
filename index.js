const mongoose = require ('mongoose')
const express = require ('express')
const app = express()
const port = process.env.port || 3004 
const person = require('./routes/person')
app.use(express.json())
app.use('/api/persons/', person)
// Asignación de puerto por el que nos dan o por defecto el 3003
app.listen(port, () => console.log('Listening on port: ' + port))
// Conexión a la base de DOMSettableTokenList, devuelve una promesa por lo que puedo usar then/catch
mongoose
    .connect('mongodb://localhost/figuraciondb', {useNewUrlParser:true, useUnifiedTopology: true })
    .then( () =>    console.log('Connected to MongoDB'))
    .catch(error => console.log('Error conecting to MongoDB'))