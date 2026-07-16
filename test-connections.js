import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function testDB() {
    try {
        console.log("Testing DB connection...");
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("DB connection successful");
    } catch (err) {
        console.error("DB connection failed:", err.message);
    }
}

async function testEmail() {
    try {
        console.log("Testing Email connection...");
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        await transporter.verify();
        console.log("Email connection successful");
    } catch (err) {
        console.error("Email connection failed:", err.message);
    }
}

async function run() {
    await testDB();
    await testEmail();
    process.exit(0);
}

run();
