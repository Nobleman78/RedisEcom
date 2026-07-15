export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;
    const existingCartItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove all items from cart
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all cart items
export const getCartItems = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });
    const cartItems = products.map((product) => {
      const cartItem = req.user.cartItems.find(
        (item) => item.id === product.id,
      );
      return { ...product.toJSON(), quantity: cartItem.quantity };
    });
    res.json(cartItems);
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
    const cartItem = user.cartItems.find((item) => item.id === id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    if (cartItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== id);
      }
      cartItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
