import Product from "../model/product.model.js";

const formatCartResponse = async (user) => {
  const products = await Product.find({
    _id: { $in: user.cartItems.map((item) => item.product) },
  });

  const cartItems = products.map((product) => {
    const cartItem = user.cartItems.find(
      (item) => item.product.toString() === product._id.toString(),
    );

    return {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      quantity: cartItem?.quantity ?? 1,
      img: product.image,
    };
  });

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return { cartItems, totalQuantity, totalPrice };
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = req.user;

    const existingCartItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cartItems.push({ product: productId, quantity });
    }

    await user.save();
    const response = await formatCartResponse(user);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove all items from cart or a single product
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId,
      );
    }

    await user.save();
    const response = await formatCartResponse(user);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all cart items
export const getCartItems = async (req, res) => {
  try {
    const response = await formatCartResponse(req.user);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update quantity of a cart item
export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    const cartItem = user.cartItems.find(
      (item) => item.product.toString() === id,
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== id,
      );
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();
    const response = await formatCartResponse(user);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
