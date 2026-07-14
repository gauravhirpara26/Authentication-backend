import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    await mongoose.connect(config.MONGO_URI)
    console.log('DB Connected Successfully')
}

export default connectDB