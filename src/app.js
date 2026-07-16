import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
const app = express()

// Security headers
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api', limiter)

// Strict CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/api/auth',authRouter)

export default app