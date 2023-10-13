import { Schema, model } from "mongoose";


const cartsCollection = 'carts'

const cartSchema = new Schema({  
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: `products`
            }
        }]
    },
    quantity: { 
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})
cartSchema.pre(`find`, function(){
    this.populate(`products.product`)
})


const cartModel = model(cartsCollection, cartSchema)

export default cartModel