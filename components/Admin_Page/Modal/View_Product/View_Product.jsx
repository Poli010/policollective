
import { ChevronLeft, ChevronRight, PhilippinePeso, X } from "lucide-react";
import { useState } from "react";

export default function View_Product({isViewProduct, closeModal,
    product_name,
    multipleImage,
    item_price,
    size_chart,
    total_stock,
    description,
    variants
}){
    const [current, setCurrent] = useState(0);
    const img = multipleImage || [];
    const nextSlide = () => {
        setCurrent((prev) => (prev === img.length - 1 ? 0 : prev + 1))
    }
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? 0 : prev - 1))
    }
    
    return(
        <>
            <div className={`fixed top-0 bg-black w-full z-20 left-0 h-screen opacity-80 ${isViewProduct ? 'scale-100' : 'scale-0'}`} onClick={closeModal}></div>
            <div className={`fixed z-20 top-1/2 left-1/2 transform -translate-1/2 bg-white dark:bg-gray-900 w-[95%] h-[600px] lg:w-[1000px] rounded-md shadow-2xl transition duration-500 ${isViewProduct ? 'scale-100' : 'scale-0'}`}>
                <X className="fixed top-3 right-3 cursor-pointer" onClick={closeModal}/>
                <div className="p-5 overflow-y-scroll h-[600px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className=" mt-3">
                            <div className="relative flex items-center justify-center w-full h-[300px] overflow-hidden ">
                                {img.map((image, index) => (
                                    <img key={index} src={`/uploads/${encodeURIComponent(image)}`} alt={item_name} className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${index === current ? 'opacity-100' : 'opacity-0'}`}/>
                                    
                                ))}
                                <button className="bg-black/60 text-white absolute top-1/2 left-2 cursor-pointer transform -translate-y-1/2 p-3" onClick={prevSlide}><ChevronLeft/></button>
                                <button className="bg-black/60 text-white absolute top-1/2 right-2 cursor-pointer transform -translate-y-1/2 p-3" onClick={nextSlide}><ChevronRight/></button>
                            </div>
                            <div className="relative flex items-center justify-center w-full overflow-hidden mt-2">
                                {img.map((_, index) => (
                                    <span key={index}  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ml-2 ${index === current ? "bg-black" : "bg-gray-400"}`}  onClick={() => setCurrent(index)}/>
                                ))}
                            </div>
                        </div>
                        <div className="p-3 mt-5">
                            <h1 className="font-bold text-2xl">{product_name}</h1>
                            <p className="flex items-center mt-2"><PhilippinePeso size={20}/>{item_price}</p>
                            <div className="mt-3">
                                <label htmlFor="size" className="font-semibold">Available Size:</label>
                                <div className="flex">
                                    {[...new Set (variants.map(v => v.size))].map((size, index) => (
                                        <p key={index} className="pr-1">{size},</p>
                                    ))}
                                </div>
                                 
                            </div>
                            <div className="mt-3">
                                <label htmlFor="size" className="font-semibold">Available Color: </label>
                                {[...new Set (variants.map(v => v.color))].map((color, index) => (
                                    <p key={index} className="pr-1">{color},</p>
                                ))}
                                   
                           
                               
                            </div>
                            <div className="mt-3">
                                <label htmlFor="size" className="font-semibold">Total Stock:</label>
                                <p>{total_stock}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 p-3 lg:grid-cols-2">
                        <div className="">
                            <label htmlFor="" className="font-semibold">Size Chart:</label>
                            <div className="flex items-center justify-center w-full h-[200px]">
                                <img src={`/uploads/${encodeURIComponent(size_chart)}`} alt="Main Image" className="w-full h-[200px] object-contain"/>
                            </div>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description" className="font-semibold">Description:</label>
                            <p className="text-justify">{description}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}