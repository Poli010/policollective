import { connectToDatabase } from "@/lib/database_connection/db";
import { generate_productID } from "@/lib/generate_uniqueID/generate_productID";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

//NEED FOR UPLOADING IMAGE
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const maxDuration = 60; // avoid build timeout
export const allowFileUploads = true; // modern replacement for bodyParser:false

export async function POST(req) {
    try{
        const db = await connectToDatabase();
        const product_id = await generate_productID(db);
        const formData = await req.formData();
        const category = await formData.get("category");
        const item_name = await formData.get("item_name");
        const description = await formData.get("description");
        const item_price = parseFloat(formData.get("item_price"));
        const discount_percentage = parseFloat(formData.get("discount_percentage")) || 0;
        const discount_price = parseFloat((item_price * (1 - discount_percentage / 100)).toFixed(2));
        const stock_quantity = await formData.get("stock_quantity");
        const main_image = await formData.get("main_image");
        const multiple_image = await formData.getAll("multiple_image");
        const size_chart = await formData.get("size_chart");

        //CHECK IF THE ITEM_NAME IS ALREADY EXIST
        const [itemName_alreadyExist] = await db.execute("SELECT * FROM products WHERE item_name = ? ", [item_name]);
        if(itemName_alreadyExist.length > 0){
            return Response.json({message: "Item is already Exist!"}, {status: 409});
        } 
        else{
            //CREATE FOLDER FOR IMAGES

            //BASE UPLOAD PATH
            const basePath = path.join(process.cwd(), "public", "uploads", "products", item_name);
            
            //MAIN IMAGE FOLDER
            const mainImage_folder = path.join(basePath, "Main_Image");
            const multipleImage_folder = path.join(basePath, "Additional_Image");
            const sizeChart_Folder = path.join(basePath, "size_chart");

            // Create folders
            await fs.promises.mkdir(mainImage_folder, { recursive: true });
            await fs.promises.mkdir(multipleImage_folder, { recursive: true });
            await fs.promises.mkdir(sizeChart_Folder, { recursive: true });

            //Image Name
            const imageName = `${Date.now()}-${main_image.name}`;
            const sizeChartName = `${Date.now()}-${size_chart.name}`;
        
            //FULL FILE PATH
            const mainImagePath = path.join(mainImage_folder, imageName);
            const sizeChartPath = path.join(sizeChart_Folder, sizeChartName);


            //Save Image
            const buffer = Buffer.from(await main_image.arrayBuffer());
            const buffer2 = Buffer.from(await size_chart.arrayBuffer());
            await writeFile(mainImagePath, buffer);
            await writeFile(sizeChartPath, buffer2);

            const multipleImage_Name = [];
            for (const img of multiple_image) {   // multiple_image = formData.getAll("multiple_image")
                const fileName = `${Date.now()}-${img.name}`;
                const filePath = path.join(multipleImage_folder, fileName);
                await writeFile(filePath, Buffer.from(await img.arrayBuffer()));
                multipleImage_Name.push(fileName);
            }

            //RELATIVE PATH
            const mainImageDBPath = `products/${item_name}/Main_Image/${imageName}`;
            const sizeChartDBPath = `products/${item_name}/size_chart/${sizeChartName}`;
            const multipleImagesDBPaths = multipleImage_Name.map(name => `products/${item_name}/Additional_Image/${name}`);

            const [rows] = await db.execute("INSERT INTO products (product_id, category, item_name, description, item_price, discount_pct, discount_price, stock_quantity, image_url, additional_image, size_chart) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [product_id, category, item_name, description, item_price, discount_percentage, discount_price, stock_quantity, mainImageDBPath, JSON.stringify(multipleImagesDBPaths), sizeChartDBPath]);
        
            if(rows.affectedRows > 0){
                return Response.json({message: "Products sucessfully created"}, {status: 201});
            }
        }
        
    }catch(err){
        return Response.json({err: err.message}, {status: 500});
    }

}