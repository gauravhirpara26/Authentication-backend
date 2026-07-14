import userModel from "../models/user.model.js";
import crypto from 'crypto'
import Transporter from '../config/emailConfig.js'
import dotenv from 'dotenv'
import path from "path";
import ejs from 'ejs'
dotenv.config()

const service = 'gmail'
const email = process.env.EMAIL_ID
const password = process.env.PASSWORD

const transporter = Transporter(service, email, password)

export async function register(req, res) {
    try {
        const { fullName, email, password } = req.body

        const isAlreadyRegistered = await userModel.findOne({
            $or: [
                { email }
            ]
        })

        if (isAlreadyRegistered) {
            res.status(409).json({
                message: 'username and email already exists'
            })
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')

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

        const templatePath = path.join(process.cwd(), 'templates', 'verify_email.ejs')
        const htmlContent = await ejs.render(templatePath, { fullName: user.fullName, otp: otp })

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
        console.error('Registration Error : ', error)
        res.status(500).json({ message: 'Internal Server Error ' })
    }
}

