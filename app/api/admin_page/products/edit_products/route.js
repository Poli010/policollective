import { connectToDatabase } from "@/lib/database_connection/db";

export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const {product_id, item_name, description, item_price, discount_pct, variants} = await request.json();
        const itemPrice = parseFloat(item_price);
        const discountPercentage = parseFloat(discount_pct) || 0;
        const newDiscountPrice = parseFloat((itemPrice * (1 - discountPercentage / 100)).toFixed(2));
        const updateToday = new Date();
        for (const v of variants){
            await db.execute("UPDATE products_variant SET size = ?, color = ?, stock_quantity = ? WHERE id = ?", [v.size, v.color, v.stock_quantity, v.id]);
        }
        const[rows] = await db.execute("SELECT SUM(stock_quantity) AS total_stock FROM products_variant WHERE product_id = ?",[product_id]);
        if(rows.length > 0) {
            const total_quantity = rows[0].total_stock;
            const [rows2] = await db.execute("UPDATE products SET item_name = ?, description = ?, item_price = ?, discount_pct = ?, discount_price = ?, total_quantity = ?, updated_at = ? WHERE product_id = ?",[
                item_name, description, itemPrice, discountPercentage, newDiscountPrice, total_quantity, updateToday ,product_id
            ])
            if(rows2.affectedRows > 0) {
                return Response.json({message: "Successfully Edited"}, {status: 200});
            }
        }
        else{
            return Response.json({message: "Somethin went wrong"}, {status: 400});
        }
    }catch(err){
        return Response.json({err: err.message}, {status: 500});
    }
    

}