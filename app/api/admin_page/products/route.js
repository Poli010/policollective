import { connectToDatabase } from "@/lib/database_connection/db";
import { generate_productID } from "@/lib/generate_uniqueID/generate_productID";

export async function POST(req) {
    try{
        const db = await connectToDatabase();
        const product_id = await generate_productID(db);

        const {category, item_name, description, item_price, stock_quantity, image_url, additional_image} = await req.json();
        const [rows] = await db.execute("INSERT INTO products (product_id, category, item_name, description, item_price, stock_quantity, image_url, additional_image, date_created, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [product_id, category, item_name, description, item_price, stock_quantity, image_url, JSON.stringify(additional_image), new Date(), null]);
        
        if(rows.affectedRows > 0){
            return Response.json({result: rows[0]}, {status: 201});
        }
    }catch(err){
        return Response.json({err: err.message}, {status: 500});
    }

}