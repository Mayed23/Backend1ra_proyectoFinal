import { Schema, model } from "mongoose"
import mongoosePaginate  from "mongoose-paginate-v2"

const prodCollection =  `products`

const productSchema = new Schema({
    name: {
        type: String,
        max: 30,
        required: true
    },
    model: {
        type: String,
        max: 30,
        requird: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    category: {
        type: String
    },
    img: {
        type: String
    }
})
productSchema.plugin(mongoosePaginate)
const product = model(prodCollection, productSchema)

export default product

