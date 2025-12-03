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
import axios from "axios";

export default function Add_Product({openAddProducts, setOpenAddProducts}){
    //CONTROL STATES
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [mainProgress, setmainProgress] = useState(0);
    const [multipleImage_Progress, setmultipleImage_Progress] = useState(0);
    const [sizeChartProgress, setsizeChartProgress] = useState(0);

    //DATA STATES
    const [categoryData, setCategoryData] = useState([]);
    const [category, setCategory] = useState("");
    const [addingCategory, setAddingCategory] = useState("");
    const [item_name, setItem_name] = useState("");    
    const [description, setDescription] = useState(""); 
    const [item_price, setItem_price] = useState("");
    const [discount_percentage, setdiscount_percentage] = useState("");
    const [stock_quantity, setStock_quantity] = useState("");   
    const [file, setFile] = useState(null);  //MAIN IMAGE
    const [files, setFiles] = useState([]); //MULTIPLE IMAGE
    const [sizeChart, setSizeChart] = useState(null);

   
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('/api/admin_page/products/fetch_products');
                if(response.status === 200){
                    setCategoryData(response.data.result);
                }
            }catch(err){
                if(err.response){
                    switch(err.response.status){
                        case 404:
                            console.log(err.response.data.message);
                            break;
                        case 500:
                            console.log(err.response.data.message);
                            break;
                        default:
                            console.log("Unexpected error", err.response.status);
                    }
                }
            }
        }
        fetchData();
        if(category === "add_category"){
            setIsAddingCategory(true);
        }
        else{
            setIsAddingCategory(false);
        }
    }, [category])


    const addProduct = async (e) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            const adding_category = category === "add_category" ? addingCategory : category;
            formData.append("category", adding_category);
            formData.append("item_name", item_name);
            formData.append("description", description);
            formData.append("item_price", item_price);
            formData.append("discount_percentage", discount_percentage);
            formData.append("stock_quantity", stock_quantity);
            formData.append("main_image", file);
            //Multiple Image
            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("multiple_image", files[i]); 
                }
            }
            formData.append("size_chart", sizeChart);
            const response = await axios.post('/api/admin_page/products/add_products',formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (progressEvent) => {
                    const {loaded, total} = progressEvent;
                    const percent = Math.round((loaded * 100) / total);
                    setmainProgress(percent);
                    setmultipleImage_Progress(percent);
                    setsizeChartProgress(percent);
                }
            });
            if(response.status === 201){
                alert("Success Added!")
            }
        }catch(err){
            if(err.response){
                console.log(err.response.data.message);
                setmainProgress(0);
                setmultipleImage_Progress(0);
                setsizeChartProgress(0);
            }
        }
        
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
                                {Array.from(new Set(categoryData.map(c => c.category))).map((uniqueCategory, index) => (
                                    <SelectItem key={uniqueCategory} value={uniqueCategory}>
                                    {uniqueCategory}
                                    </SelectItem>
                                ))}
                                <SelectItem value="add_category"><Plus/> Add Category</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {isAddingCategory && 
                        <div className="flex flex-col pb-5">
                            <label htmlFor="item_name">Indicate Category: *</label>
                            <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Hoodie" value={addingCategory} onChange={(e) => setAddingCategory(e.target.value)} required/>
                        </div>
                    }
                    <div className="flex flex-col pb-5">
                        <label htmlFor="item_name">Item Name: *</label>
                        <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. God's plan shirt" value={item_name} onChange={(e) => setItem_name(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="description">Description: *</label>
                        <textarea  id="description" className="border border-gray-500 h-10 rounded-md outline-blue-500 p-3 text-sm" placeholder="Your Item Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="item_price">Item Price: *</label>
                        <input type="number" id="item_price" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.250" value={item_price} onChange={(e) => setItem_price(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="discount_percentage">Discount Percentage: (Optional)</label>
                        <input type="number" id="discount_percentage" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.20" value={discount_percentage} onChange={(e) => setdiscount_percentage(e.target.value)} />
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="stock_quantity">Stock Quantity: *</label>
                        <input type="number" id="stock_quantity" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.10" value={stock_quantity} onChange={(e) => setStock_quantity(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Main Image: *</label>
                        <Upload_Image file={file} setFile={setFile} mainProgress={mainProgress}/>
                    </div>    
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Upload Multiple Image: *</label>
                        <Multiple_Image files={files} setFiles={setFiles} multipleImage_Progress={multipleImage_Progress}/>
                    </div>  
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Upload Size Chart: *</label>
                        <SizeChart_Upload sizeChart={sizeChart} setSizeChart={setSizeChart} sizeChartProgress={sizeChartProgress}/>
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