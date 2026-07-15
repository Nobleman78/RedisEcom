import express from "express";
import { addToCart,removeAllFromCart } from "../controllers/cart.Controller.js";
const router = express.Router();
router.get("/",protectRoute,getCartItems)
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id",protectRoute, updateQuantity)

export default router;
