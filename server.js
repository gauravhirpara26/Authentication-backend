import app from "./src/app.js"
import connectDB from "./src/config/database.js"
import { validateEnv } from "./src/config/envValidation.js"

const host = 'localhost'
const port = process.env.PORT || 3000

validateEnv()

connectDB()

app.listen(port, () => {
    console.log(`Server Stared on : http://${host}:${port}`)
})