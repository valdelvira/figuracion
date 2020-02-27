const multer = require('multer')
const dir = './public/' // Directorio donde se guardaran
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        // construyo el nombre del fichero, nos permite diferenciar nombre de ficheros por la hora 
        const filename = Date.now() + file.originalname.toLowerCase().split(' ').join('-')
        cb(null, filename) // Parémtros error y destino
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"){
            cb(null, true) // Parámetros error y aceptar fichero
        } else {
            cb(null, false)
            const error = new Error('Formatos admitidos jpg, jpeg y png')
            error.httpStatusCode = 400
            return cb( error )
        }
    },
    limits: { fileSize: 5242880 }
})

module.exports = upload