function authorize( roles= [] ) {
    //Compruebo que el array que recibo es de tipo string
    if(typeof roles === 'string'){
        //Comnpruebo que el rol que recibo esta dentro de los establecidos
        roles=[roles]
    }

    return [
        (req, res, next) => {
            //Compruebo que el usuraio tiene el rol necesario para cierto recurso
            if(!roles.includes(req.user.role)) return res.status(403).send('No tiene permisos para acceder al recurso')
            next()
        }
    ]

}

module.exports = authorize