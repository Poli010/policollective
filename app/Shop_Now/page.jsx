'use client'
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from 'axios';

export default function Shop_Now(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {theme} = useTheme();
    const [products, setProducts] = useState([]);
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
                <div className="relative h-auto px-20">
                    <div className="pt-30">
                        <h1 className="text-center font-bold text-2xl">Collections</h1>
                    </div>
                    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-x-20 pt-10 pb-10">
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer "> 
                            <img src="/Collections/All.png" alt="All Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">All <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer "> 
                            <img src="/Collections/T-Shirt.jpg" alt="T-shirt Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Tops <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer "> 
                            <img src="/Collections/Hoodie.jpg" alt="Hoodie Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Outerwear <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer "> 
                            <img src="/Collections/pants.jpg" alt="BottomsCollections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Bottoms <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer "> 
                            <img src="/Collections/Shoes.jpg" alt="Footwear Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Footwear <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer "> 
                            <img src="/Collections/Cap.jpg" alt="Accessories Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Accessories <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                    </div>
                </div>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
        </>
    );
}