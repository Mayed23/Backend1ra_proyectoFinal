import { promises as fs } from "fs"
import { nanoid } from "nanoid"


export default class ProductManager {
    constructor() {
        this.path = "./src/json/product.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, `utf-8`)
        return JSON.parse(products)
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    addProducts = async (product) => {
        let prod = await this.readProducts()
        product.id = nanoid(6)
        let productAll = [...prod, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"

    }

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductsById = async (id) => {
        
        let prodId = await this.exist(id)
        if (!prodId) return "Producto no encontrado"
        return (prodId)
    }

    getProductsLimit = async (limit) => {
        const products = await this.readProducts()
        const productsList =[]
        for (let i = 0; 1 < limit; i++) {
            productsList.push (products[i])
        } 
        return productsList()
    }

    exist = async (id)=>{
        let product = await this.readProducts()
        return product.find(prod => prod.id === id)
    }

    updateProductsById = async (id, product) =>{
        let prodId = await this.exist(id)
        if(!prodId) return "Producto no encontrado"
        await this.deleteProducts(id)
        let prod = await this.readProducts()
        let products = [{...product, id : id}, ...prod]
        await this.writeProducts(products)
        return "Producto Actualizado con éxito"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let prodExist = products.some(prod => prod.id === id)
        if (prodExist) {
            let prodFilter = products.filter(prod => prod.id != id)
            await this.writeProducts(prodFilter)
            return "Producto Eliminado"
        }
        return "Producto no encontrado"
    }

}

