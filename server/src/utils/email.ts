import nodemailer from 'nodemailer';

const sendEmail = async (option: { email: string, subject: string, text: string }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }, 
    } as nodemailer.TransportOptions);

    const emailOptions = {
        from: 'Sky.net Support <support@skynet.com>',
        to: option.email,
        subject: option.subject,
        text: option.text,
    }

    await transporter.sendMail(emailOptions);
}

export { sendEmail };