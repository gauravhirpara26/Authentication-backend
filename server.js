import app from "./src/app.js"
import connectDB from "./src/config/database.js"

const host = 'localhost'
const port = 3000

connectDB()

app.listen(port, () => {
    console.log(`Server Stared on : http://${host}:${port}`)
})