import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(request) {
    try{
        const db = await connectToDatabase();
        const [rows] = await db.execute("SELECT * FROM products ORDER BY product_id DESC");
        if(rows.length > 0){
            return Response.json({result: rows}, {status: 200});
        }
        else{
            return Response.json({message: "No Product Found!"}, {status: 404});
        }
       


    } catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
    
}