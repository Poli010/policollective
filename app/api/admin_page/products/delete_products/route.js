import { connectToDatabase } from "@/lib/database_connection/db";
import fs from "fs/promises";
import path from "path";
export async function POST(req) {
    try{
        const db = await connectToDatabase();
        const {product_id} = await req.json();
        const basePath = path.join(process.cwd(), "public", "uploads", "products", product_id.toString());
        await fs.rm(basePath, {
            recursive: true,
            force: true
        });
        const [rows] = await db.execute("DELETE FROM products_variant WHERE product_id = ?", [product_id]);
        if(rows.affectedRows > 0){
            const [rows2] = await db.execute("DELETE FROM products WHERE product_id = ? ", [product_id]);
            if(rows2.affectedRows > 0){
                return Response.json({message: "DELETE SUCCESS!"}, {status: 200});
            }
        }
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}