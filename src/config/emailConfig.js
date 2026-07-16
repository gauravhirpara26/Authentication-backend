import nodemailer from 'nodemailer'

function Transporter(service, email, password) {
    const Transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
            user: email,
            pass: password
        },
        connectionTimeout: 10000
    })

    return Transporter
}
export default Transporter