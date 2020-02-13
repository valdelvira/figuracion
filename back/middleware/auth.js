const jwt = require('jsonwebtoken') //$env:SECRET_KEY_JWT_PERSON_API="280342510"

//creo una función meddle q debe tener next para que siga
function auth(req, res, next){
    //busco en la cabecera el campo que lleva el payload
    const jwTowen = req.header('Authorization')
    if(!jwTowen) return res.status(401).send('Acceso denegado. No hay token')
    try{
        //Verifico que los datos enviados en el payload se desencripten con la variable de sesión almacenada
        const payload = jwt.verify(jwTowen, process.env.SECRET_KEY_JWT_PERSON_API)
        req.user = payload
        //llamo a la siguiente función middleware
        next()
        
    } catch(e){
        res.status(401).send('Acceso denegado. Token no válido')
    }
}

module.exports = auth