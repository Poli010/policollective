import { connectToDatabase } from "@/lib/database_connection/db";
import fs from "fs";
import path from "path";

export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const {product_id, item_name, description, item_price, discount_pct} = await request.json();
        const itemPrice =  parseFloat(item_price);
        const discountPercentage = parseFloat(discount_pct) || 0;
        const newDiscountPrice = parseFloat((itemPrice * (1 - discountPercentage / 100)).toFixed(2));
        const updateToday = new Date();
        // if(old_itemName !== item_name){
        //     const oldFolder = path.join(process.cwd(), "public", "uploads", "products", old_itemName);
        //     const newFolder = path.join(process.cwd(), "public", "uploads", "products", item_name);
        //     if(fs.existsSync(oldFolder)){
        //         fs.renameSync(oldFolder, newFolder);
        //     }
        //     else{
        //         return Response.json({message: "Folder doesn't exist!"}, {status: 404});
        //     }
        // }
        const [rows] = await db.execute("UPDATE products SET item_name = ?, description = ?, item_price = ?, discount_pct = ?, discount_price = ?, updated_at = ? WHERE product_id = ?",[
            item_name, description, itemPrice, discountPercentage, newDiscountPrice, updateToday ,product_id
        ])
        if(rows.affectedRows > 0) {
            return Response.json({message: "Successfully Edited"}, {status: 200});
        }
        else{
            return Response.json({message: "Somethin went wrong"}, {status: 400});
        }
    }catch(err){
        return Response.json({err: err.message}, {status: 500});
    }
    

}