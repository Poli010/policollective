import { connectToDatabase } from "@/lib/database_connection/db"
export async function GET() {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.execute('SELECT NOW() AS now');
        return Response.json({ success: true, time: rows[0].now });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, error: error.message });
    }
}