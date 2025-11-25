import { connectToDatabase } from "@/lib/database_connection/db";
export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const { email, verificationCode } = await request.json();
        const [rows] = await db.execute("SELECT * FROM user_accounts WHERE email = ?", [email]);
        if(rows.length > 0){
            const user = await rows[0];
            if(String(user.verification_code) !== verificationCode){
                return Response.json({message: "Verification Code Does not Match!"}, {status: 400});
            }else{
                const [updateTable] = await db.execute("UPDATE user_accounts SET verification_confirmation = ? WHERE email = ?", [verificationCode, email]);
                if(updateTable.affectedRows > 0){
                    return Response.json({message: "Success!"}, {status: 200});
                }
            }
        }else{
            return Response.json({message: "User not found!"}, {status: 404});
        }
    }catch(error){
        return Response.json({error: error.message}, {status: 500});
    }
}