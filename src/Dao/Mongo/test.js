import cart from "./models/carts.model.js";

const run = async () => {
  try {
    const carts = await cart.find({});

    console.log(JSON.stringify(carts));
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

await run();
