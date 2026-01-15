import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MONGODB CONNECTED SUCCESSFULLY')
    } catch (error) {
        console.log(error, "MONGODB CONNECTION IS FAILED")
    }
}

export default connectDB