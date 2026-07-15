import express from "express";

import {
  checkoutSuccess,
  createCheckoutSession,
} from "../controllers/payment.Controller.js";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);
