import nodemailer from 'nodemailer';

/**
 * Sends an email using the specified options.
 *
 * This function uses the Nodemailer library to send an email. The email server configuration
 * is loaded from environment variables.
 *
 * @async
 * @param option - The email options.
 * @param option.email - The recipient's email address.
 * @param option.subject - The subject of the email.
 * @param option.text - The plain text body of the email.
 * @returns A promise that resolves when the email is sent.
 * @throws If sending the email fails.
 */
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
        from: 'Sky.net Support <support@skynetwork.app>',
        to: option.email,
        subject: option.subject,
        text: option.text,
    }

    await transporter.sendMail(emailOptions);
}

export { sendEmail };