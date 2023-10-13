import { Schema, model } from "mongoose";

const ordenCoellction = `orden`

const ordenSchema = new Schema({
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
    quantity: Number
})

   

const ordenModel = model(ordenCoellction,ordenSchema)


export default ordenModel