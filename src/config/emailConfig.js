import nodemailer from 'nodemailer'

function Transporter(service, email, password) {
    const Transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth: {
            user: email,
            pass: password
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    return Transporter
}
export default Transporter