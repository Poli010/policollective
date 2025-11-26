import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(request) {
    try{
        const db = await connectToDatabase();
        const {searchParams} = new URL(request.url);
        const email = searchParams.get("email");
        const [rows] = await db.execute("SELECT * FROM user_accounts WHERE email = ?", [email]);
        if(rows.length > 0){
            return Response.json({result: rows[0]}, {status: 200});
        }
        else{
            return Response.json({message: "user not found"}, {status: 404});
        }
    }catch(err){
        return Response.json({err: err.message}, {status: 500});
    }
}