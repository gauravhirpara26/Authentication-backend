import userModel from "../models/user.model.js";
import Transporter from '../config/emailConfig.js'
import dotenv from 'dotenv'
import path from "path";
import ejs from 'ejs'
import bcrypt from 'bcrypt'
dotenv.config()

const service = 'gmail'
const SenderEmail = process.env.EMAIL_ID
const password = process.env.PASSWORD

const transporter = Transporter(service, SenderEmail, password)

export async function register(req, res) {
    try {
        const { fullName, email, password } = req.body

        const isAlreadyRegistered = await userModel.findOne({
            $or: [
                { email }
            ]
        })

        if (isAlreadyRegistered) {
            return res.status(409).json({
                message: 'username and email already exists'
            })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000)

        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
            isVerified: false
        })

        const templatePath = path.join(process.cwd(), 'src', 'templates', 'verify_email.ejs')
        const htmlContent = await ejs.renderFile(templatePath, { fullName: user.fullName, otp: otp })

        await transporter.sendMail({
            from: `My App <${email}>`,
            to: user.email,
            subject: 'Verify Your Account - OTP Code',
            html: htmlContent
        })

        res.status(201).json({
            message: 'Account created Successfully. Check your email for the otp',
            email: user.email
        })
    } catch (error) {
        console.log('Registration Error : ', error)
        res.status(500).json({ message: 'Internal Server Error ' })
    }
}

