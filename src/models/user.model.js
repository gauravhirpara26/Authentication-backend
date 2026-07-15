import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
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

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600, partialFilterExpression: { isVerified: false } })

const userModel = mongoose.model('User', userSchema)

export default userModel