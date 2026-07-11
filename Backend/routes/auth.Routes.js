import express from "express"
import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.Controller.js"
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh-token", refreshToken)
router.get("/getprofile", getProfile)

export default router