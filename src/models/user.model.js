import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'username is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

export default userModel