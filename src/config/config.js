if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI not defined in enviornment variable')
}
if(!process.env.JWT_SECRET){
    throw new Error('JWT_SECRET not defined in enviornment variable')
}

if(!process.env.EMAIL_ID){
    throw new Error('EMAIL_ID not defined')
}
if(!process.env.PASSWORD){
    throw new Error('PASSWORD not defined')
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_ID: process.env.EMAIL_ID,
    PASSWORD: process.env.PASSWORD
}

export default config
