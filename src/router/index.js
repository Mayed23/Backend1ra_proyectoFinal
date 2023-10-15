import { Router } from "express";
import CartsRouter from "./cart.router.js";
import ProductRouter from "./product.router.js";
import UsersRouter from "./user.router.js";
import viewsRouter from "./views.router.js";

const router = Router()

router.use("/views", viewsRouter)
// router.use("/views/products", viewsRouter)
// router.use("/views/realTiemProduct", viewsRouter)
router.use("/views/messages", viewsRouter)
router.use("/api/products", ProductRouter)
router.use("/api/carts", CartsRouter)
router.use("/api/users", UsersRouter)

export default router