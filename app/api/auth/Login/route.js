import { connectToDatabase } from "@/lib/database_connection/db";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const { email, password } = await request.json();
        const [rows] = await db.execute("SELECT * FROM user_accounts WHERE email = ?", [email]);
        if(rows.length > 0){
            const userPassword = await rows[0].password;
            const account_type = await rows[0].account_type;
            const passVerified = await bcrypt.compare(password, userPassword);
            if(passVerified){
                if(account_type === "end_user"){
                    return Response.json({role: "end_user"}, {status: 200});
                }
                else{
                    return Response.json({role: "admin"}, {status: 200});
                }
            }
            else{
                return Response.json({message: "Wrong Password"}, {status: 400});
            }
        }
        else{
            return Response.json({message: "Please sign up first before you login"}, {status: 404});
        }
    }catch(error){
        return Response.json({error: error.message}, {status: 500});
    }
}