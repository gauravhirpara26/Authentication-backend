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
const allowedOrigins = [
    'http://localhost:5173',
    'https://authentication-psi-one.vercel.app'
]

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/api/auth',authRouter)

export default app