import { Router } from "express";
import productsMongoManager from "../Dao/Mongo/productsMongoManager.js";



const ProductRouter = Router()
const product = new productsMongoManager()

ProductRouter.get("/", async (req, res) => {
    res.send(await product.getProducts())
})  


ProductRouter.get("/page", async (req, res) => {
    res.send(await product.getProductsPage())
})  


// ProductRouter.get("/:limit", async (req, res) =>{
//     const limit = req.query.limit
//     if (limit <= 0){
//         limit = 0
        
//     }
//     return res.send(await product.getProductsLimit({limit}))
// })

ProductRouter.get("/:id", async (req, res) =>{
    try{
        let id = req.params.id
        console.log('Route', id)
        res.send(await product.getProductsById(id))
    }catch(error){
        console.log(`Id no encontrado`)
        return error
    }
})

ProductRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

ProductRouter.put("/:id", async (req, res) =>{
    try{
        let id = req.params.id
        let updateProd = req.body
        res.send (await product.updateProductsById (id, updateProd))
    }catch(error){
        return error
    }
}) 
ProductRouter.delete("/:id", async (req, res) =>{
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})


export default ProductRouter
