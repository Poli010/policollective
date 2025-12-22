import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(req) {
    try{
        const db = await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const city_municipality_code = searchParams.get('city_municipality_code');
        const [rows] = await db.execute("SELECT * FROM philippine_barangays WHERE city_municipality_code = ?", [city_municipality_code]);
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}