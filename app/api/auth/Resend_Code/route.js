import { connectToDatabase } from "@/lib/database_connection/db";
import sendEmail from "@/lib/sendMail";
export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const { email } = await request.json();
        const verificationCode =  Math.floor(100000 + Math.random() * 900000);
         const htmlContent = `
            <p>Your NEW Verification Code is: <strong>${verificationCode}</strong></p>
            <p><strong>-Poli Collective</strong></p>
        `
        const result = await sendEmail({
            to: email,
            subject: "NEW Verification code",
            html: htmlContent
        })
        if(result){
            const [rows] = await db.execute("UPDATE user_accounts SET verification_code = ? WHERE email = ?", [verificationCode, email]);
            if(rows.affectedRows > 0){
                return Response.json({message: "Resend Success"}, {status: 200});
            }else{
                return Response.json({message: "Something went wrong"}, {status: 400});
            }
        }else{
            return Response.json({message: "Not sent"}, {status: 400});
        }
        
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }

}