'use client'
import { useState, useEffect } from "react";
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { PhilippinePeso, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import View_SizeChart_FS from "@/components/Buy_Now/View_SizeChart_FS";


export default function Buy_Now(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [openSizeChart, setOpenSizeChart] = useState(false);
    const [sizeChart, setSizeChart] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const {theme} = useTheme();
    const searchParams = useSearchParams();
    const product_id = searchParams.get('product_id');
    const [product_details, setProduct_details] = useState([]); 
    const [product_variants, setproduct_variants] = useState([]); 
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [current, setCurrent] = useState(0);
    //CONVERT ARRAY DB INTO STRING
    const multipleImage = product_details.additional_image ? JSON.parse(product_details.additional_image) : []
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('/api/endUser_page/buy_now/fetch_product_details', {
                    params: {product_id: product_id}
                })
                if(response.status === 200){
                    setProduct_details(response.data.result1);
                    setproduct_variants(response.data.result2);
                }
            }catch(err){
                if(err.response){
                    console.log(err.response.data.message);
                }
            }
        } 
        fetchData();
    }, []);

    const handleSelectedSize = (size) => {
        setSelectedSize(size);
    }

    const handleSelectedColor = (color) => {
        setSelectedColor(color);
    }

    const addQuantity = () => {
        if(quantity === 10){
            return
        }
        else{
            setQuantity(quantity + 1);  
        }
    }

    const subtractQuantity = () => {
        if(quantity === 1){
            return
        }
        else{
            setQuantity(quantity - 1);
        }
        
    }
    
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? 0 : prev - 1))
    }
    const nextSlide = () => {
        setCurrent((prev) => (prev === multipleImage.length - 1 ? 0 : prev + 1))
    }

    function toTitleCase(str){
        if(!str){
            return "";
        }
        else{
           return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
    }

    const handleOpenSizeChart = (size_chart) => {
        setOpenSizeChart(true);
        setSizeChart(size_chart);
    }
    return(
        <>
            <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen}/>
                <div className="relative h-auto lg:px-10 xl:px-20">
                    <div className="pt-30">
                        <h1 className="text-center font-bold text-2xl">Buy Now</h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 px-3 md:px-10 lg:px-0 py-10 mt-5">
                            <section className="relative flex items-center justify-center h-[400px] overflow-hidden rounded-md">
                                {multipleImage.map((image, index) => (
                                    <img key={index} src={`/uploads/${encodeURIComponent(image)}`} alt="Images" className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 rounded-md ${index === current ? 'opacity-100' : 'opacity-0'}`}/>
                                ))}
                                <button className="bg-black/60 text-white absolute top-1/2 left-1 lg:left-2 cursor-pointer transform -translate-y-1/2 p-3 rounded-full" onClick={prevSlide}><ChevronLeft/></button>
                                <button className="bg-black/60 text-white absolute top-1/2 right-1 lg:right-2 cursor-pointer transform -translate-y-1/2 p-3 rounded-full" onClick={nextSlide}><ChevronRight/></button>
                                
                            </section>
                            <div className="relative flex items-center justify-center w-full overflow-hidden mt-2 md:hidden">
                                {multipleImage.map((_, index) => (
                                    <span key={index}  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ml-2 ${index === current ? "bg-black" : "bg-gray-400"}`}  onClick={() => setCurrent(index)}/>
                                ))}
                            </div>
                            <section className="px-6 pb-6 pt-5 lg:pt-0">
                                <p className="font-bold text-2xl">{product_details?.item_name?.toUpperCase()}</p>
                                <p className="text-xs text-gray-500 mt-1">ID: {product_details.product_id}</p>
                                <div className="flex items-center gap-3 mt-4">
                                    {product_details.discount_pct > 0 &&  <span className="text-gray-400 line-through">₱{product_details.item_price}</span>}
                                    <span className="font-semibold text-xl flex items-center"><PhilippinePeso size={18} className="mr-1" />{product_details.discount_price}</span>
                                    {product_details.discount_pct > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{Number(product_details.discount_pct)}% OFF</span>}
                                </div>
                                {product_variants.some(variant => variant.color) && (
                                    <div className="mt-6">
                                        <p className="text-sm font-semibold mb-2">Colors:</p>
                                        <div className="flex flex-wrap gap-3 max-w-[350px]">
                                            {product_variants.map((variant) => (
                                                <label key={variant.color} className={`py-1.5 px-4 rounded-md text-sm cursor-pointer border ${selectedColor === variant.color ? "bg-black text-white border-black" : "border-gray-300 hover:bg-black hover:text-white"}`}>
                                                    <input type="radio" value={variant.color} name="size" checked={selectedColor === variant.color} onChange={() => handleSelectedColor(variant.color)} hidden />
                                                    {toTitleCase(variant.color)}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="mt-6">
                                    <p className="text-sm font-semibold mb-2">Size:</p>
                                    <div className="flex flex-wrap gap-3 max-w-[350px]">
                                        {product_variants.map((variant) => (
                                            <label key={variant.size} className={`py-1.5 px-4 rounded-md text-sm cursor-pointer border ${selectedSize === variant.size ? "bg-black text-white border-black" : "border-gray-300 hover:bg-black hover:text-white"}`}>
                                                <input type="radio" value={variant.size} name="size" checked={selectedSize === variant.size} onChange={() => handleSelectedSize(variant.size)} hidden />
                                                {toTitleCase(variant.size)}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm font-semibold mb-2">Quantity:</p>
                                    <div className="flex items-center gap-3">
                                        <button className="w-9 h-9 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer" onClick={subtractQuantity}>−</button>
                                        <span className="w-12 text-center border border-gray-300 py-1 rounded">{quantity}</span>
                                        <button className="w-9 h-9 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer" onClick={addQuantity}>+</button>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button className="flex-1 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition cursor-pointer text-sm dark:border-white dark:border">Buy now</button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-black text-sm rounded-md hover:bg-gray-800 hover:text-white transition cursor-pointer dark:border-white">
                                        <ShoppingCart size={16} />Add to cart
                                    </button>
                                </div>
                            </section>
                            <section className="pt-5">
                                <div className="hidden items-center justify-center h-[250px] p-10 lg:p-14 md:block">
                                    <Carousel className="w-full max-w-full">
                                        <CarouselContent >
                                            {multipleImage.map((image, index) => ( 
                                                <CarouselItem className={`basis-1/1 md:basis-1/2 lg:basis-1/3 h-[230px]`} key={index}><img src={`/uploads/${encodeURIComponent(image)}`} alt="multiple image" className="w-full h-full object-cover rounded-md"/></CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className={`cursor-pointer`}/>
                                        <CarouselNext className={`cursor-pointer`}/>
                                    </Carousel>
                                </div>
                                <div className="h-[400px] overflow-hidden p-4 md:mt-5 lg:mt-10">
                                    <p className="text-sm font-semibold">Size Chart:</p>
                                    <img src={`/uploads/${encodeURIComponent(product_details.size_chart)}`} alt="size_chart" className="object-contain h-full w-full cursor-pointer mt-2 transition duration-500 hover:scale-110" onClick={() => handleOpenSizeChart(product_details.size_chart)}/>
                                </div>
                                <p className="text-center text-sm text-gray-600 leading-relaxed mt-3">Click the image to full screen</p>
                            </section>
                            <section className="pt-5 lg:pt-0">
                                {/* Description */}
                                <div className="border-t p-6">
                                    <p className="text-sm font-semibold mb-2">Description</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {product_details.description}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
            <View_SizeChart_FS openSizeChart={openSizeChart} size_chart={sizeChart} closeSizeChart={() => setOpenSizeChart(false)}/>
        </>
    );
}