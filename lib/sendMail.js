import nodemailer from 'nodemailer';
export default async function sendEmail({to, subject, html}) {
    try{
        const transporter = nodemailer.createTransport({
           host: "smtp.gmail.com",
           port: 587,
           secure: false,
           auth:{
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
           },
        });
        await transporter.sendMail({
            from: `"Poli Collective" <${process.env.NODEMAILER_EMAIL}>`,
            to,
            subject,
            html, 
        });
        return {success: true};
    }catch(error){
        console.log("error:", error.message);
        return {success: false, error}
    }
}