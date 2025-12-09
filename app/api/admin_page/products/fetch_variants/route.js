import { connectToDatabase } from "@/lib/database_connection/db";

export async function GET(req) {
    try{
        const db = await connectToDatabase();
        const {searchParams} = new URL(req.url);
        const product_id =  searchParams.get('product_id');
        const [rows] = await db.execute("SELECT * FROM products_variant WHERE product_id = ?", [product_id]);
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
   
}