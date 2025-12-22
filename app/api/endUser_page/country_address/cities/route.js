import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(req) {
    try{
        const db = await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const province_code = searchParams.get('province_code');
        const [rows] = await db.execute("SELECT * FROM philippine_cities WHERE province_code = ?", [province_code]);
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}