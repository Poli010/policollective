'use client'
import SideBar from "@/components/SideBar/SideBar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Login from "@/components/Modal/Login_Modal/Login";
import { useTheme } from "next-themes";
import axios from "axios";
import { PhilippinePeso } from "lucide-react";

export default function All_Collections(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const {theme} = useTheme();
    console.log(products)
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get('/api/admin_page/products/fetch_products');
                if(response.status === 200){
                    setProducts(response.data.result);
                }
            }catch(err){
                if(err.response){
                    switch(err.response.status){
                        case 404:
                            console.log(err.response.data.message);
                            break;
                        default:
                            console.log(err.response.data.message);
                    }
                }
            }
        }
        fetchData();
    }, []);
    return(
        <>
            <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen}/>
                 <div className="relative h-auto lg:px-10 xl:px-20">
                    <div className="pt-30">
                        <h1 className="text-center font-bold text-2xl">All Collections</h1>
                    </div>
                    <div className="grid place-items-center grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-y-5 md:gap-x-10 mt-10 px-3 md:px-5 lg:px-0 pb-5">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                    <div key={index} className="w-full md:w-62 lg:w-75 bg-white dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                                        <div className='flex items-center justify-center'>
                                            <div className="relative w-full md:w-62 lg:w-75  h-[350px] rounded-t-lg overflow-hidden group">
                                                <Image 
                                                    src={`/uploads/${encodeURIComponent(product.image_url)}`}
                                                    alt={product.item_name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {product.discount_pct > 0 && <p className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{Number(product.discount_pct)}% OFF</p>}
                                            </div>
                                        </div>
                                        
                                        <div className="px-5 md:px-4 py-3">
                                            <p className="font-semibold text-lg">{product.item_name}</p>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Category: {product.category}</p>
                                            <div className='flex flex-row just items-center'>
                                                {product.total_quantity > 0 ? (<p className="text-gray-600 dark:text-gray-300 text-sm">Status: Active </p>) :  (<p className="text-gray-600 dark:text-gray-300 text-sm">Status: Out of Stock </p>)}
                                                {product.total_quantity > 0 ? (<p className='bg-yellow-500 rounded-full w-3 h-3 ml-1'></p>) :  (<p className='bg-red-500 rounded-full w-3 h-3 ml-1'></p>)}
                                            </div>
                                        
                                            <div className="flex justify-between mt-2">
                                                <div className=' h-15'>
                                                    <p className="text-sm text-gray-500">Price:</p>
                                                    {product.discount_pct > 0 ? (<p className="text-sm text-gray-500 flex items-center justify-end mr-1 line-through">{product.item_price}</p>) : ('')}
                                                    {product.discount_pct > 0 ? (<p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> {product.discount_price}</p>) : (<p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> {product.item_price}</p>)}
                                                    
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Stock:</p>
                                                    <p className="font-semibold text-center">{product.total_quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ACTION BUTTONS */}
                                        <div className="flex items-center justify-center px-2 md:px-4 py-4 ">
                                            <button className="flex items-center justify-center gap-1 bg-black hover:bg-black/90 transition duration-500 text-white w-full px-5 py-2 rounded-md text-sm cursor-pointer" >
                                                Buy now
                                            </button>
                                        </div>
                                    </div>
                                
                            ))
                            ) : (
                                <div className='mt-10 col-span-full'>
                                    <div className='flex flex-col items-center'>
                                        <Image src="/Logo/noData.svg" width={500} height={100} alt='No Data Found' loading="eager" />
                                        <p className="text-xl mt-3">No products found!</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
        </>
    );
}