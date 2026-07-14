import nodemailer from 'nodemailer'

function Transporter(service, email, password) {
    const Transporter = nodemailer.createTransport({
        service: service,
        auth: {
            user: email,
            pass: password
        }
    })

    return Transporter
}
export default Transporter