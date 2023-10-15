import cart from "./models/carts.model.js";
import product from "./models/products.model.js";

export default class cartsMongoManager {
  constructor() {
    this.model = {
      cart,
      product,
    };
  }

  getCarts = async () => {
    try {
      const carts = await this.model.cart.find({});
      return carts;
    } catch (error) {
      return error;
    }
  };

  addCarts = async () => {
    try {
      const cartNew = await this.model.cart.create({});
      return cartNew, `Carrito de compras creado con éxito`;
    } catch (error) {
      return `Error al crear el carrito de compras`;
    }
  };

  getCartsById = async (id) => {
    try {
      const cartId = await this.model.cart.findById(id);
      if (!cartId) {
        return "Carrito no encontrado";
      }
      return cartId;
    } catch (error) {
      return `carrito no existe`;
    }
  };

  addToCarts = async (carId, prodId) => {
    try {
      const existCart = await this.model.cart.findById(carId);
      if (!existCart) {
        return "Carrito no encontrado";
      }
      const existProduct = await this.model.product.findById(prodId);

      if (existProduct.length < 1) return "Producto no encontrado";

      return this.model.cart.findByIdAndUpdate(carId,
        { $push: { products: existProduct._id}},
        { new: true, useFindAndModify: false }
      )
      
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  deleteProdToCart = async (cartId, prodId) => {
    try {
      const cart = await this.model.cart.findById(cartId);
      if (!cart) {
        return `Carrito de compra no éxiste`;
      }

      const prodInCar = cart.products.findIndex(
        (product) => product.productId === prodId
      );
      if (prodInCar != -1) {
        cart.products.splice(prodInCar, 1);
        await cart.save();
        return `Se ha eliminado el producto`;
      } else {
        return `Producto no existe`;
      }
    } catch (error) {
      return error;
    }
  };

  updateProdCart = async (cartId, newProducts) => {
    try {
      const cart = await this.model.cart.findById(cartId);
      if (!cart) {
        return `Carrito de compra no existe`;
      }
      cart.products = newProducts;
      await cart.save();
      return `Carrito actualizado con exito`;
    } catch (error) {
      return `Productos no agragados`;
    }
  };
}
