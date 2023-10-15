import { Router } from "express";
import cartsMongoManager from "../Dao/Mongo/cartsMongoManager.js";

const CartsRouter = Router()
const carts = new cartsMongoManager

CartsRouter.post("/", async (req,res) => {
    let cartNew = req, body
    res.send(await carts.addCarts(cartNew))
    
})

CartsRouter.get("/", async (req, res)=>{
    res.send (await carts.getCarts())
})

CartsRouter.get("/:id", async (req, res)=>{
    res.send (await carts.getCartsById(req.params.id))
})

CartsRouter.post("/:cid/product/:pid", async (req, res)=>{

    const carId = req.params.cid
    const prodId = req.params.pid
    res.send (await carts.addToCarts(carId,prodId))

})

export default CartsRouter