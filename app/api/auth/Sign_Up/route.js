import { connectToDatabase } from "@/lib/database_connection/db";
import bcrypt from 'bcrypt';
import sendEmail from "@/lib/sendMail";
import { generate_accountID } from "@/lib/generate_accountID";

export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const {fullname, email, password} = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        const accountID = await generate_accountID(db);
        const htmlContent = `
            <p>Hello Good Day ${fullname}!</p>
            <p>Your Verification Code is: <strong>${verificationCode}</strong></p>
            <br/>
            <p>Thank you for creating an account with us <strong>Enjoy Shopping!</strong>,</p>
            <p><strong>-Poli Collective</strong></p>
        `
        const [checkEmail] = await db.execute("SELECT * FROM user_accounts WHERE email = ?", [email]);
        if(checkEmail.length > 0){
            return Response.json({message: "This Email is already exist!"}, {status: 400})
        }
        else{
            const result = await sendEmail({
                to: email,
                subject: `Your Verification Code`,
                html: htmlContent
            });
            if(result.success){
                const [rows] = await db.execute("INSERT INTO user_accounts (account_id, fullname, email, password, account_type, verification_code, verification_confirmation) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                [accountID, fullname, email, hashedPassword, 'end_user', verificationCode, '']);
                if(rows.affectedRows > 0){
                    return Response.json({message: "Sent Success"}, {status: 200});
                }
                
            }
            else{
                return Response.json({message: "Sending failed!"}, {status: 400});
            }
        }
    }catch(error){
        return Response.json({message: error.message}, {status: 500});
    }

}