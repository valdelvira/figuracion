const mongoose = require ('mongoose')
const express = require ('express')
const port = process.env.port || 3004 // Lo toma o bien por variubale de sesión o en texto
const cors = require('cors')
const person = require('./routes/person');
const user = require('./routes/user');
const login = require('./routes/login');
const company = require('./routes/company');
const dotenv = require('dotenv').config();  // Permite asignar variables de entorno en modo prepro

// $env:SECRET_KEY_JWT_PERSON_API="1234"
const app = express()
app.use(express.json())
app.use(cors())
app.use('/public', express.static('public'))  // Da acceso publico a la carpeta
app.use('/api/person/', person)
app.use('/api/user/', user)
app.use('/api/login/', login)
app.use('/api/company', company)
console.log(process.env.SECRET_KEY_JWT_PERSON_API)

// Asignación de puerto por el que nos dan o por defecto el 3003
app.listen(port, () => console.log('Listening on port: ' + port))
// Conexión a la base de DOMSettableTokenList, devuelve una promesa por lo que puedo usar then/catch
mongoose
    .connect('mongodb://localhost/figuraciondb', {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true })
    .then( () =>    console.log('Connected to MongoDB'))
    .catch(error => console.log('Error conecting to MongoDB'))