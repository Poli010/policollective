export async function generate_orderID(db) {
    const now = new Date();
    
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const datePart = `${month}${day}${year}`;

    const [rows] = await db.execute("SELECT COUNT(*) as count FROM orders WHERE DATE(order_at) = CURDATE()");
    const count = rows[0].count + 1
    const countPart = String(count).padStart(4, '0');

    return `POLI-${datePart}-${countPart}`; //output: POLI-111825-0001

}