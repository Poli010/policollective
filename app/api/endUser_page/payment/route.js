import { connectToDatabase } from "@/lib/database_connection/db";
import axios from "axios";
import { generate_orderID } from "@/lib/generate_uniqueID/generate_orderID";

export async function POST(request) {
    try{
        const db = await connectToDatabase();
        const {
           email,
           contact_number,
           first_name,
           last_name,
           line_1,
           region,
           province,
           city,
           barangay,
           shipping_method,
           payment_method,
           items,
           totalPayment
        } = await request.json();
        const order_id = generate_orderID();
        const address = `${line_1}, ${barangay}, ${city}, ${province}`;
        const parcel_status = "processing";
        const status = "Pending"
        const paymentMethod = payment_method.toLowerCase(); // "gcash", "maya", or "card"
        const [rows] = await db.execute("INSERT INTO orders (order_id, first_name, last_name, address, email, contact_number, parcel_status, shipping_method, amount, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            order_id, first_name, last_name, address, email, contact_number, parcel_status, shipping_method, totalPayment, payment_method, status
        ]);

        if(rows.affectedRows > 0){
            for (const item of items){
                await db.execute("INSERT INTO orders_item (order_id, product_id, item_name, quantity, size, color) VALUES (?, ?, ?, ?, ?, ?)",[
                    order_id, item.product_id, item.item_name, item.quantity, item.size, item.color
                ]);
            }
        }
        
        const secretKey = process.env.PAYMONGO_SECRET_KEY;
        if (!secretKey) throw new Error("PAYMONGO_SECRET_KEY is missing");
        const authHeader = "Basic " + Buffer.from(secretKey + ":").toString("base64");
        const response = await axios.post("https://api.paymongo.com/v1/payment_intents", {
            data: {
                attributes: {
                    amount: Math.round(totalPayment * 100), // centavos
                    currency: "PHP",
                    payment_method_allowed: [paymentMethod], // fixed
                    description: `Order #${order_id}`,        // fixed
                        metadata: {
                            order_id: order_id,
                            customer_email: email
                        }
                }
            },
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json"
            }
            });
        if(response){
           return new Response(JSON.stringify({ url: response.data.data.attributes.next_action.redirect.url }), { status: 200 });
        }
    }catch(err){
        return new Response(JSON.stringify({message: err.message}), {status: 500});
    }
}