import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.Routes.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js"

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


app.get("/", (req, res) => {
    res.send("Hello World")
})