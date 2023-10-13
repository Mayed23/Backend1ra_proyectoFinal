import cartModel from "./models/carts.model.js"
import productsMongoManager from "./productsMongoManager.js"

const productAll = new productsMongoManager()

export default class cartsMongoManager{
    constructor() {
        this.model = cartModel
    }

    getCarts = async () => {
        try{
            const carts = await this.model.find({})
            return carts
        }catch(error){
            return `No existen carros de compras`,[]
        }
    }

    addCarts = async () => {
        try{
            const cartNew = await this.model.create({})
            return cartNew, `Carrito de compras creado con éxito`
        }catch(error){
            return `Error al crear el carrito de compras`
        }
    }

    getCartsById = async (id) => {
        try{
            const cartId = await this.model.findById(id)
            if (!cartId)    {
            return "Carrito no encontrado"
             }return cartId  
        }catch(error){
            return `carrito no existe`
        }
    }

    addToCarts = async (cartId, prodId) =>{
    try{
            const existCart = await this.model.findById(cartId)
            if (!existCart)  
            {
                return "Carrito no encontrado"
            }            
            const prodInCar = await products.find((product) => product.productId === prodId)
            if (prodInCar)
            {
                prodInCar.quantity += 1
            }else{
            existCart.products.push({
                productId: prodId,
                quantity: 1

                })
            }
            await existCart.save() 
            returm `Producto agragado al carrito`  
        }catch(error){
            return `Producto no agregado`
        }
    }

    deleteProdToCart = async (cartId, prodId) => {
        try{
            const cart = await this.model.findById(cartId)
            if(!cart)
            {
                return `Carrito de compra no éxiste`
            }
        
            const prodInCar = cart.products.findIndex((product) => product.productId === prodId);
            if(prodInCar != -1)
            {
                cart.products.splice(prodInCar, 1)
                await cart.save()
                return `Se ha eliminado el producto`
            } else {
                return `Producto no existe`
            } 
        }    catch (error){
                return error
            }
     }
    
     
    updateProdCart = async (cartId, newProducts) => {
        try{
            const cart = await this.model.findById(cartId)
            if(!cart)
            {
                return `Carrito de compra no existe`
            }
            cart.products = newProducts
            await cart.save()
            return `Carrito actualizado con exito`
        } catch(error){
            return `Productos no agragados`
        }

    }
}
  


            



