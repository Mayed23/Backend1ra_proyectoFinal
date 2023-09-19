import  express from "express"
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import * as path from "path"
import __dirname from "./utils.js"
import ProductManager from "./archivos/ProductManager.js"

import ProductRouter from "./router/product.router.js"
import CartsRouter from "./router/cart.router.js"


const app = express()
const PORT = 8000

const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/product", ProductRouter)
app.use("/api/carts", CartsRouter)

//Validor conexión
const httpServer = app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`)
})

const socketServer = new Server (httpServer)

socketServer.on("connection", socket => {
    console.log("Nuevo Cliente Conectado")
//Recibe Info
    socket.on("message", data => {
        console.log(data)
    })

    socket.on("newProduct", (newProduct) => {
        product.addProducts(newProduct)
        socketServer.emit("success", "Producto Agregado Correctamente");
    });
//Envia Info
    socket.emit("test","mensaje desde servidor a cliente, se valida en consola de navegador")

})




//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//CSS Static
app.use("/", express.static(__dirname + "/public"))

//Socket View
app.use("/realtimeproducts", ProductRouter)

//Handelbars View
app.get("/", async (req, res) => {
    let allProducts  = await product.getProducts()
    res.render("home", {
        title: "Handlebars",
        products : allProducts
    })
})

//Se simplifica codigo de middleware colocando lo siguiente
// app.use("/api/products", ProductRouter)
// app.use("/api/carts", CartRouter)
