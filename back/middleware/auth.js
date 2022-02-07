const jwt = require('jsonwebtoken') //$env:SECRET_KEY_JWT_PERSON_API="hola"

//creo una función meddle q debe tener next para que siga
function auth(req, res, next){
    //busco en la cabecera el campo que lleva el payload
    let jwToken = req.header('Authorization')
    //let jwToken = localStorage.getItem('token')
    if(!jwToken) return res.status(401).send('Acceso denegado. No hay token')
    // limpio la primera parte de la cadena del token xq la paso con el método Bearer, que introduce esa palabra
    // al inicio de la cadena del token
    jwToken = jwToken.split(' ')[1]
    try{
        //Verifico que los datos enviados en el payload se desencripten con la variable de sesión almacenada
        const payload = jwt.verify(jwToken, process.env.SECRET_KEY_JWT_PERSON_API)
        req.user = payload
        //llamo a la siguiente función middleware
        next()
        
    } catch(e){
        res.status(401).send('Acceso denegado. Token no válido')
    }
}

module.exports = auth
