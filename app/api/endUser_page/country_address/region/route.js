import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET() {
    try{
        const db = await connectToDatabase();
        const [rows] = await db.execute("SELECT * FROM philippine_regions");
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}