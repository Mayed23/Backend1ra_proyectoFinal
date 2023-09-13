import { Router } from "express";
import CartsManager from "../archivos/CartsManager.js";


const CartsRouter = Router()
const carts = new CartsManager

CartsRouter.post("/", async (req,res) => {
    res.send(await carts.addCarts())
})

CartsRouter.get("/", async (req, res)=>{
    res.send (await carts.readCarts())
})

CartsRouter.get("/:id", async (req, res)=>{
    res.send (await carts.getCartsById(req.params.id))
})

CartsRouter.post("/cid/products/pid", async (req, res)=>{
    let cartsId = req.params.cid
    let prodId = req.params.pid
    res.send(await carts.addToCarts(cartsId,prodId))
})
export default CartsRouter