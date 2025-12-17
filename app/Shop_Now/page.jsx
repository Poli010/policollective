'use client'
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Shop_Now(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {theme} = useTheme();
    const router = useRouter();
    
    const showAllCollections = () => {
        router.push('/Shop_Now/All_Collections');
    }

    const showTopsCollections = () => {
        router.push('/Shop_Now/Tops_Collections');
    }

    const showOuterwearCollections = () => {
        router.push('/Shop_Now/Outerwear_Collections');
    }

    const showBottomsCollections = () => {
        router.push('/Shop_Now/Bottoms_Collections');
    }
        
    const showFootwearCollections = () => {
        router.push('/Shop_Now/Footwear_Collections');
    }
        
    const showAccessoriesCollections = () => {
        router.push('/Shop_Now/Accessories_Collections');
    }
    return(
        <>
            <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen}/>
                <div className="relative h-auto px-20">
                    <div className="pt-30">
                        <h1 className="text-center font-bold text-2xl">Collections</h1>
                    </div>
                    <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-x-20 pt-10 pb-10">
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer" onClick={showAllCollections}> 
                            <img src="/Collections/All.png" alt="All Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">All <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer" onClick={showTopsCollections}> 
                            <img src="/Collections/T-Shirt.jpg" alt="T-shirt Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Tops <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer" onClick={showOuterwearCollections}> 
                            <img src="/Collections/Hoodie.jpg" alt="Hoodie Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Outerwear <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer" onClick={showBottomsCollections}> 
                            <img src="/Collections/pants.jpg" alt="BottomsCollections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Bottoms <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer" onClick={showFootwearCollections}> 
                            <img src="/Collections/Shoes.jpg" alt="Footwear Collections" className="opacity-30 group-hover:scale-110  transition-all duration-500"  />
                            <p className="absolute top-1/2 left-1/2 transform -translate-1/2 text-white font-bold text-2xl text-center group-hover:tracking-wider transition-all duration-500">Footwear <br/> Collections <br/> <span className="text-sm font-normal underline">View Products </span></p>
                        </section>
                        <section className="relative shadow-2xl h-[300px] w-[300px] rounded-md bg-black group overflow-hidden cursor-pointer" onClick={showAccessoriesCollections}> 
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