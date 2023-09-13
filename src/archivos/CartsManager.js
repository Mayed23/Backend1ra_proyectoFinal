import { promises as fs } from "fs"
import { nanoid } from "nanoid"
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager

export default class CartsManager{
    constructor() {
        this.path = "./src/json/cart.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, `utf-8`)
        return JSON.parse(carts)
    }

    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    addCarts = async () => {
        let cartPre = await this.readCarts()
        let id = nanoid(6)
        let cartNew = [{id : id, products : []}, ...cartPre]
        await this.writeCarts(cartNew)
        return "Carrito agregado" 
    }

    exist = async (id)=>{
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    getCartsById = async (id) => {
        
        let cartId = await this.exist(id)
        if (!cartId) return "Carrito no encontrado"
        return cartId
    }

    addToCarts = async (cartId, prodId) =>{
        let cartsId = await this.exist(cartId)
        if (!cartsId) return "Carrito no encontrado"   
        let prodpId = await productAll.exist(prodId)
        if (!prodpId) return "Producto no encontrado" 
        let cartsAll = await this.readCarts()
        let cartsFilter = cartsAll.filter(cart => cart.id != cartId)

        if(cartsId.products.some(prod => prod.id === prodId)){
         let prodInCart = cartId.products.find (prod => prod.id === prodId)
         prodInCart.cantidad+1
            let cartNew = [prodInCart, ...cartsFilter] 
            await this.writeCarts(cartNew)
            return "Producto sumado al carrito"
        }
        cartId.products.push({id:prodId.id, cantidad:1})

        let cartsNew = [cartId, ...cartsFilter]

        await this.writeCarts (cartsNew)
        return "Producto Agregado al Carrito"

    }
}    


