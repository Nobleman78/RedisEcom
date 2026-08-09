import express from "express";

import {
  checkoutSucess,
  createCheckoutSession,
} from "../controllers/payment.Controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSucess);

export default router;
