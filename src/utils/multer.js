import multer from "multer"
import __dirname from "../utils/utils.js"


const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, `${__dirname(__dirname)}/publico/imagen`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer ({
    storage
})


module.exports = { uploader }