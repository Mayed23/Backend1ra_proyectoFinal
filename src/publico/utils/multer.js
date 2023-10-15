import multer from "multer"
import __dirname from "./utils.js"



const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, `${dirname(__dirname)}/publico`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer ({
    storage
})

export default uploader