import express from "express";
import { subscribe } from "../controllers/newletter.Controller";

const router = express.Router();
router.post("/", subscribe);
export default router;
