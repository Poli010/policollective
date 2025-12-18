import { connectToDatabase } from "@/lib/database_connection/db";
export async function GET(req) {
    try{
        const db = await connectToDatabase();
        const {searchParams} =  new URL(req.url);
        const product_id =  searchParams.get('product_id');
        const [productDetails] = await db.execute("SELECT * FROM products WHERE product_id = ?", [product_id]);
        const [product_variants] = await db.execute("SELECT * FROM products_variant WHERE product_id = ?", [product_id]);
        if(productDetails.length > 0 && product_variants.length > 0){
            return Response.json({result1: productDetails[0], result2: product_variants}, {status: 200});
        } 
    }catch(err){
        return Response.json({message: err.message}, {status: 500});
    }
}