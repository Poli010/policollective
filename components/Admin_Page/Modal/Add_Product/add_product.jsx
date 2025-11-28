import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CloudUpload, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import Upload_Image from "../Upload_Image/upload_image";
import Multiple_Image from "../Multiple_Image/multiple_image";
import SizeChart_Upload from "../SizeChart_Upload/sizeChart_upload";

export default function Add_Product({openAddProducts, setOpenAddProducts}){
    //IMAGE STATES
    const [sizeChart, setSizeChart] = useState(null);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    //CATEGORY
    const [category, setCategory] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    useEffect(() => {
        if(category === "add_category"){
            setIsAddingCategory(true);
        }
        else{
            setIsAddingCategory(false);
        }
    }, [category])

    const addProduct = (e) => {
        e.preventDefault();
    }
    return(
        <>
            <div className={`fixed top-1/2 left-1/2 transform -translate-1/2 bg-white w-[500px] shadow-2xl rounded-md py-5 dark:bg-gray-900 transition duration-500 ${openAddProducts ? 'scale-100' : 'scale-0'}`}>
                <h1 className="font-bold text-center text-2xl">Add Products</h1>
                <form className="mt-3 h-[500px] overflow-y-scroll px-5" onSubmit={addProduct}>
                    <div className="pb-5">
                        <label htmlFor="category">Category: *</label>
                        <Select value={category} onValueChange={(value) => setCategory(value)} required>
                            <SelectTrigger className="w-full cursor-pointer border-gray-500 dark:border-white h-10 outline-blue-500">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Hoodie</SelectItem>
                                <SelectItem value="dark">T-Shirt</SelectItem>
                                <SelectItem value="system">Shoes</SelectItem>
                                <SelectItem value="add_category"><Plus/> Add Category</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {isAddingCategory && 
                        <div className="flex flex-col pb-5">
                            <label htmlFor="item_name">Indicate Category: *</label>
                            <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Hoodie" required/>
                        </div>
                    }
                    <div className="flex flex-col pb-5">
                        <label htmlFor="item_name">Item Name: *</label>
                        <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. God's plan shirt" required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="description">Description: *</label>
                        <textarea  id="description" className="border border-gray-500 h-10 rounded-md outline-blue-500 p-3 text-sm" placeholder="Your Item Description" required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="item_price">Item Price: *</label>
                        <input type="number" id="item_price" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.250" required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="discount_price">Discount Price: (Optional)</label>
                        <input type="number" id="discount_price" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.20" required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="stock_quantity">Stock Quantity: *</label>
                        <input type="number" id="stock_quantity" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.10" required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Main Image: *</label>
                        <Upload_Image file={file} setFile={setFile}/>
                    </div>    
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Upload Multiple Image: *</label>
                        <Multiple_Image files={files} setFiles={setFiles}/>
                    </div>  
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Upload Size Chart: *</label>
                        <SizeChart_Upload sizeChart={sizeChart} setSizeChart={setSizeChart}/>
                    </div>
                    <div>
                        <button className="flex items-center justify-center bg-black text-white w-full p-2 rounded-md cursor-pointer hover:bg-gray-700"><CloudUpload/>Upload Product</button>  
                    </div>    
                </form>
                <X className="absolute top-2 right-3 cursor-pointer" onClick={() => setOpenAddProducts(false)}/>  
            </div>
            
        </>
    );
}