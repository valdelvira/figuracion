const mongoose = require ('mongoose')
const express = require ('express')
const app = express()
const port = process.env.port || 3004 //Lo toma o bien por variubale de sesión o en texto
const cors = require('cors')
const person = require('./routes/person')
const user = require('./routes/user')
const login = require('./routes/login')
// $env:SECRET_KEY_JWT_PERSON_API="1234"
app.use(express.json())
app.use(cors())
app.use('/api/persons/', person)
app.use('/api/user/', user)
app.use('/api/login/', login)

// Asignación de puerto por el que nos dan o por defecto el 3003
app.listen(port, () => console.log('Listening on port: ' + port))
// Conexión a la base de DOMSettableTokenList, devuelve una promesa por lo que puedo usar then/catch
mongoose
    .connect('mongodb://localhost/figuraciondb', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true })
    .then( () =>    console.log('Connected to MongoDB'))
    .catch(error => console.log('Error conecting to MongoDB'))