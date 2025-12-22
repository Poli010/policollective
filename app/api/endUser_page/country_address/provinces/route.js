import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(req) {
    try{
        const db = await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const region = searchParams.get('region');
        const [rows] = await db.execute("SELECT * FROM philippine_provinces WHERE region_code = ?", [region]);
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}