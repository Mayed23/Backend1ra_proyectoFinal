import { Schema, model } from "mongoose";

const cartsCollection = "carts";

const cartSchema = new Schema({
  products: [{
      type: Schema.Types.ObjectId,
      ref: "product",
    }],
});

// cartSchema.pre('/^find/', function () {
//   this.populate('products');
//   next();
// });

const cart = model(cartsCollection, cartSchema);

export default cart;
