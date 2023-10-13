import  express from "express"
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import * as path from "path"
import __dirname from "./utils/utils.js"

import connectDb from "./config/config.js"
import router from "./router/index.js"
import viewsRouter from "./router/views.router.js"

const app = express()
const PORT = 8000

const routerApp = router

app.use(routerApp)




//conección a mi base de datos compass cambio a integracion
// link de mongo en carpeta config

connectDb () 

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.set(`/`, viewsRouter)


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






