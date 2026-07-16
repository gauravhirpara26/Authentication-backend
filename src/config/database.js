import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log('DB Connected Successfully')
    } catch (err) {
        console.error('DB Connection Failed:', err.message)
        process.exit(1)
    }
}

export default connectDB