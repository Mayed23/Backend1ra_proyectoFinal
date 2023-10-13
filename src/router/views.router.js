import  { Router } from "express"
import productModel from "../Dao/Mongo/models/products.model.js"
import messageModel from "../Dao/Mongo/models/message.model.js"
import  uploader  from "../utils/multer.js"

 
 const router = Router()

// router.get(`/subirarch`, (req, res) => {
//     res.render(`subirArch`)
// })

// router.post(`/subirarch`, uploader.single(`file`), (req, res) =>{
//     if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo guardar la Imagen`})

//     res.send({status: `success`, payload: `Archivo subido con Éxito`})



 router.get(`/message`, (req, res) => {
    res.render(`message`)
 })

 router.post(`/message`, uploader.single(`file`), (req, res) =>{
    if(!req.file) return res.status(400).send({status: `error`, error: `No se pudo enviar el mensaje`})
    res.send({status: `success`, payload: `mensaje enviado`})


})



const viewsRouter = Router()

// //const product = new productsMongoManager()


//Socket View
viewsRouter.use("/realtimeproducts", (req, res)=>{
    res.status(200), render(`realTimeProduct`)
})

// //Handelbars View
viewsRouter.get("/home", (req, res)=>{
    res.status(200), render(`home`)
})

viewsRouter.get("/products",  async (req, res)=>{
    try{
    const { numPage=1 } = req.query 
        let {
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            totalPage
        } = await productModel.paginate({}, {limit: 10, numPage})
    // if (){ pendiente realizar validaciones

    // }
    //console.log(product)
        res.status(200), render(`products`, {
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page,
            totalPage
        }) 
    }catch (error){
     console.log(error)
        }
})



export default viewsRouter





