import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(req) {
    try{
        const db = await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const [rows] = await db.execute("SELECT * FROM products WHERE category = ? ORDER BY product_id DESC", [category]);
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
        else{
            return Response.json({message: "No Collection found"}, {status: 404});
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}