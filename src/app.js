import  express from "express"
import ProductRouter from "./router/product.router.js"
import CartsRouter from "./router/cart.router.js"


const app = express()
const PORT = 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", ProductRouter)
app.use("/api/carts", CartsRouter)


app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`)
})