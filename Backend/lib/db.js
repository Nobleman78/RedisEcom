import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'redisEcom'
        })
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDB Connection Failed")
        process.exit(1)
    }
}