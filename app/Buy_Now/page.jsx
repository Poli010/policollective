'use client'
import { useState, useEffect } from "react";
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { PhilippinePeso, ShoppingCart } from "lucide-react";

export default function Buy_Now(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {theme} = useTheme();
    const searchParams = useSearchParams();
    const product_id = searchParams.get('product_id');
    const [product_details, setProduct_details] = useState([]); 
    const [product_variants, setproduct_variants] = useState([]); 
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    console.log(quantity);
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
    return(
        <>
            <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen}/>
                <div className="relative h-auto lg:px-10 xl:px-20">
                    <div className="pt-30">
                        <h1 className="text-center font-bold text-2xl">Buy Now</h1>
                        <div className="grid grid-cols-2 border border-black py-10">
                            <section className="border border-black h-[400px]">
                                <img src="/Logo/GoogleLogo.png" alt="" className="h-full w-full object-contain border border-black"/>
                            </section>
                            <section className=" p-6 ">
                                <p className="font-bold text-2xl">Nissan Shirt</p>
                                <p className="text-xs text-gray-500 mt-1">Product ID: 123123123</p>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="text-gray-400 line-through">₱220</span>
                                    <span className="font-semibold text-xl flex items-center"><PhilippinePeso size={18} className="mr-1" />220.00</span>
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">20% OFF</span>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm font-semibold mb-2">Size</p>
                                    <div className="flex flex-wrap gap-3 max-w-[350px]">
                                        {sizes.map((size) => (
                                            <label key={size} className={`py-1.5 px-4 rounded-md text-sm cursor-pointer border ${selectedSize === size ? "bg-black text-white border-black" : "border-gray-300 hover:bg-black hover:text-white"}`}>
                                                <input type="radio" value={size} name="size" checked={selectedSize === size} onChange={() => handleSelectedSize(size)} hidden />
                                                {size}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm font-semibold mb-2">Quantity</p>
                                    <div className="flex items-center gap-3">
                                        <button className="w-9 h-9 border border-gray-300 rounded hover:bg-gray-100" onClick={subtractQuantity}>−</button>
                                        <span className="w-12 text-center border border-gray-300 py-1 rounded">{quantity}</span>
                                        <button className="w-9 h-9 border border-gray-300 rounded hover:bg-gray-100" onClick={addQuantity}>+</button>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button className="flex-1 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">Buy now</button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-black rounded-md hover:bg-black hover:text-white transition">
                                        <ShoppingCart size={18} />Add to cart
                                    </button>
                                </div>
                            </section>
                            <section className="border border-black h-[450px] ">
                                <div className="flex items-center justify-between border border-black h-[150px] overflow-hidden p-2">
                                   <div className="border border-black h-33 w-30">
                                        
                                   </div>
                                   <div className="border border-black h-33 w-30">
                                        
                                   </div>
                                   <div className="border border-black h-33 w-30">
                                        
                                   </div>
                                   <div className="border border-black h-33 w-30">
                                        
                                   </div>
                                </div>
                                <div className="border border-black h-[300px] overflow-hidden p-4">
                                    <p className="text-sm font-semibold">Size Chart:</p>
                                    <img src="/Logo/GoogleLogo.png" alt="" className="object-contain h-full w-full"/>
                                </div>
                            </section>
                            <section className="border border-black h[400px]">
                                {/* Description */}
                                <div className="border-t p-4">
                                    <p className="text-sm font-semibold mb-2">Description</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                    Premium cotton Nissan shirt designed for everyday comfort.
                                    Breathable fabric, durable stitching, and a relaxed fit —
                                    perfect for casual wear or street style. asdhasd asdiuqpwipa apsdpasid  asdoiapsd asidpaosidpai p iaosd paoisd 
                                     asdauisd u apsdapsid aksjdalsjd 
                                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis repellendus expedita dolorem, vitae magni debitis nemo corrupti porro deleniti autem aut in modi quia fugit excepturi, non maiores accusantium voluptatum.
                                    </p>
                                </div>
                            </section>
                             
                            
                        </div>
                    </div>
                </div>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
        </>
    );
}