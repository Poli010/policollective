import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleAlert, CloudUpload, Loader, Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import Upload_Image from "./Upload_Image/upload_image";
import Multiple_Image from "./Multiple_Image/multiple_image";
import SizeChart_Upload from "./SizeChart_Upload/sizeChart_upload";
import axios from "axios";

export default function Add_Product({openAddProducts, setOpenAddProducts, clodeAddProductModal}){
    //CONTROL STATES
    // const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
    const [isMainImageEmpty, setIsMainImageEmpty] = useState(false);
    const [isMultipleImageEmpty, setIsMultipleImageEmpty] = useState(false);
    const [isSizeChartEmpty, setIsSizeChartEmpty] = useState(false);
    const [isAlreadyExist, setIsAlreadyExist] = useState(false);
    const [mainProgress, setmainProgress] = useState(0);
    const [multipleImage_Progress, setmultipleImage_Progress] = useState(0);
    const [sizeChartProgress, setsizeChartProgress] = useState(0);

    //DATA STATES
    const [variants, setVariants] = useState([
        { size: "", color: "", stock: "" }
    ]);
    const [category, setCategory] = useState("");
    const [addingCategory, setAddingCategory] = useState("");
    const [item_name, setItem_name] = useState("");    
    const [description, setDescription] = useState(""); 
    const [item_price, setItem_price] = useState("");
    const [discount_percentage, setdiscount_percentage] = useState("");  
    const [file, setFile] = useState(null);  //MAIN IMAGE
    const [files, setFiles] = useState([]); //MULTIPLE IMAGE
    const [sizeChart, setSizeChart] = useState(null);

    const handleVariantValue = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    }

    const addVariant = () => {
        setVariants([...variants, { size: "", color: "", stock: "" }]);
    }

    const removeVariant = (index) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setVariants(newVariants);
    };

    const addProduct = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setIsCategoryEmpty(false);
        setIsMainImageEmpty(false);
        setIsMultipleImageEmpty(false);
        setIsSizeChartEmpty(false);
        setIsAlreadyExist(false);
        if(!category){
            setIsCategoryEmpty(true);
            setIsSubmit(false);

        }
        else if(!file){
            setIsMainImageEmpty(true);
            setIsSubmit(false);
        }
        else if(files.length === 0){
            setIsMultipleImageEmpty(true);
            setIsSubmit(false);
        }
        else if(!sizeChart){
            setIsSizeChartEmpty(true);
            setIsSubmit(false);
        }
        else{
            try{
                const formData = new FormData();
                formData.append("category", category);
                formData.append("item_name", item_name);
                formData.append("description", description);
                formData.append("item_price", item_price);
                formData.append("discount_percentage", discount_percentage);
                formData.append("variants", JSON.stringify(variants));
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
                    window.location.reload();
                }
            }catch(err){
                if(err.response){
                    switch(err.response.status){
                        case 500:
                            console.log(err.response.data.message);
                            setmainProgress(0);
                            setmultipleImage_Progress(0);
                            setsizeChartProgress(0);
                            setIsSubmit(false);
                        break;
                        case 409:
                            console.log(err.response.data.message);
                            setmainProgress(0);
                            setmultipleImage_Progress(0);
                            setsizeChartProgress(0);
                            setIsSubmit(false);
                            setIsAlreadyExist(true);
                        break;
                    }

                }
            }
        }
    }
    return(
        <>
            <div className={`fixed top-0 bg-black w-full h-screen z-20 opacity-70 ${openAddProducts ? 'scale-100' : 'scale-0'}`} onClick={clodeAddProductModal}></div>
            <div className={`fixed top-1/2 left-1/2 z-30 transform -translate-1/2 bg-white w-[95%] sm:w-[80%] md:w-[500px] shadow-2xl rounded-md py-5 dark:bg-gray-900 transition duration-500 ${openAddProducts ? 'scale-100' : 'scale-0'}`}>
                <h1 className="font-bold text-center text-2xl">Add Products</h1>
                <form className="mt-3 h-[500px] overflow-y-scroll px-5" onSubmit={addProduct}>
                    <div className="pb-5">
                        <label htmlFor="category">Category: *</label>
                        <Select value={category} onValueChange={(value) => setCategory(value)} required>
                            <SelectTrigger className="w-full cursor-pointer border-gray-500 dark:border-white h-10 outline-blue-500">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Tops">Tops</SelectItem>
                                <SelectItem value="Outerwear">Outerwear</SelectItem>
                                <SelectItem value="Bottoms">Bottoms</SelectItem>
                                <SelectItem value="Footwear">Footwear</SelectItem>
                                <SelectItem value="Accessories">Accessories</SelectItem>
                            </SelectContent>
                        </Select>
                        {isCategoryEmpty && <p className="bg-red-500 flex items-center px-2 rounded-md text-white h-9 mt-2"><CircleAlert/><span className="ml-1">Please select category</span></p>}
                    </div>
                    {/* {isAddingCategory && 
                        <div className="flex flex-col pb-5">
                            <label htmlFor="item_name">Indicate Category: *</label>
                            <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Hoodie" autoComplete="off" value={addingCategory} onChange={(e) => setAddingCategory(e.target.value)} required/>
                        </div>
                    } */}
                    <div className="flex flex-col pb-5">
                        <label htmlFor="item_name">Item Name: *</label>
                        <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. God's plan shirt" value={item_name} onChange={(e) => setItem_name(e.target.value)} autoComplete="off" required/>
                    </div>
                   <div className="flex flex-col pb-5">
                        <label htmlFor="item_name">Variants: *</label>
                        {variants?.map((variant, index) => (
                            <div className="grid grid-cols-2 pb-5" key={index}>
                                <div className="flex flex-col">
                                    <label htmlFor="item_name">Size: *</label>
                                    <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Small, Medium, Large" value={variant.size} onChange={(e) => handleVariantValue(index, "size", e.target.value)} autoComplete="off" required/>
                                </div>
                                <div className="flex flex-col pl-1">
                                    <label htmlFor="item_name">Color: (Optional)</label>
                                    <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Black, White" value={variant.name} onChange={(e) => handleVariantValue(index, "color", e.target.value)} autoComplete="off"/>
                                </div>
                                <div className="flex flex-col pt-2 col-span-2">
                                    <label htmlFor="item_name">Quantity: *</label>
                                    <input inputMode="numeric" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. 10" value={variant.stock} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); handleVariantValue(index, "stock", onlyNumber)}} autoComplete="off" required/>
                                </div>
                                <button type="button" className="flex items-center bg-red-500 py-2 px-2 w-42 text-white rounded-md mt-2 text-sm hover:bg-red-900 cursor-pointer" onClick={() => removeVariant(index)}><Trash size={18}/> Remove Variant</button>
                            </div>
                        ))}
                        <div className="mt-3">
                            <button type="button"  className="flex items-center bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 cursor-pointer" onClick={addVariant}><Plus/>Add Variant</button>
                        </div>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="description">Description: *</label>
                        <textarea  id="description" className="border border-gray-500 rounded-md outline-blue-500 p-3 text-sm" placeholder="Your Item Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="item_price">Item Price: *</label>
                        <input inputMode="numeric" id="item_price" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.250" autoComplete="off" value={item_price} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); setItem_price(onlyNumber)}} required/>
                    </div>
                    <div className="flex flex-col pb-5">
                        <label htmlFor="discount_percentage">Discount Percentage % (Optional):</label>
                        <input inputMode="numeric" id="discount_percentage" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex.20" autoComplete="off" value={discount_percentage} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); setdiscount_percentage(onlyNumber)}} />
                    </div>

                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Main Image: *</label>
                        <Upload_Image file={file} setFile={setFile} mainProgress={mainProgress}/>
                        {isMainImageEmpty && <p className="bg-red-500 flex items-center px-2 rounded-md text-white h-9 mt-2"><CircleAlert/><span className="ml-1">Please select main image</span></p>}
                    </div>    
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Upload Multiple Image: *</label>
                        <Multiple_Image files={files} setFiles={setFiles} multipleImage_Progress={multipleImage_Progress}/>
                        {isMultipleImageEmpty && <p className="bg-red-500 flex items-center px-2 rounded-md text-white h-9 mt-2"><CircleAlert/><span className="ml-1">Please select multiple image</span></p>}
                    </div>  
                    <div className="flex flex-col pb-5">
                        <label htmlFor="main_image">Upload Size Chart: *</label>
                        <SizeChart_Upload sizeChart={sizeChart} setSizeChart={setSizeChart} sizeChartProgress={sizeChartProgress}/>
                        {isSizeChartEmpty && <p className="bg-red-500 flex items-center px-2 rounded-md text-white h-9 mt-2"><CircleAlert/><span className="ml-1">Please select size chart</span></p>}
                        {isAlreadyExist && <p className="bg-red-500 flex items-center px-2 rounded-md text-white h-9 mt-2"><CircleAlert/><span className="ml-1">Item name is already exist.</span></p>}
                    </div>
                    <div>
                        {isSubmit ? (<button className="flex items-center justify-center bg-black text-white w-full p-2 rounded-md opacity-80" disabled><Loader className="animate-spin"/></button>) : (<button className="flex items-center justify-center bg-black text-white w-full p-2 rounded-md cursor-pointer hover:bg-gray-700"><CloudUpload/>Upload Product</button>  )}
                        
                    </div>    
                </form>
                <X className="absolute top-2 right-3 cursor-pointer" onClick={() => setOpenAddProducts(false)}/>  
            </div>
            
        </>
    );
}