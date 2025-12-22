'use client'
import Link from "next/link";
import { LogOut, ShoppingCart, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ScrollLink from "@/lib/helper/ScrollLink";
import { useRouter } from "next/navigation";

export default function SideBar({setShowLoginModal, isOpen, setIsOpen, cartCount, setCartCount}){

    const {theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();
    const [session2, setSession2] = useState(false);
    const router = useRouter();
      useEffect(() => {
        setMounted(true);
        const storedCart = JSON.parse(localStorage.getItem("Cart")) || [];
        const totalCart = storedCart.length
        setCartCount(totalCart);
        const ifSessionActive = sessionStorage.getItem("session2");
        if(ifSessionActive){
            setSession2(true);
        }
        else{
            setSession2(false);
        }
      }, []);
      // Prevent SSR mismatch
      if (!mounted) {
        return null;
      }

    return(
        <>  
            
            <div className={`fixed top-0 left-0 h-screen bg-gray-100 px-5 shadow-lg z-20 transform transition-transform duration-500 ease-in-out w-[80%] lg:flex lg:h-25 lg:w-full lg:mx-auto lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                <X  className="absolute top-3 right-5 z-20 cursor-pointer lg:hidden" size={30} onClick={() => setIsOpen(false)}/>
                {theme === 'dark' ? (<img src='/Logo/darkMode_logo.png' alt="Poli Collective Logo" title="Poli Collective Logo" className="w-[100px] cursor-pointer" onClick={() => router.push('/')}/>) : (<img src='/Logo/landing.png' alt="Poli Collective Logo" title="Poli Collective Logo" className="w-[100px] cursor-pointer" onClick={() => router.push('/')}/>) }
                <div className=" text-lg flex flex-col lg:flex-row lg:items-center lg:w-full lg:justify-end">
                    <Link href="/" className="px-5 py-3 hover:text-blue-500 transition duration-500">Home</Link>
                    <Link href="/Shop_Now" className="px-5 py-3 hover:text-blue-500 transition duration-500">Shop now</Link>
                    <ScrollLink href="/#about_us">About</ScrollLink>
                    <ScrollLink href="/#footer">Contact</ScrollLink>
                    <div className="lg:flex flex-col lg:items-center py-3 hidden">
                        {cartCount > 0 ? (<div className="absolute bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs ml-8 -mt-4 lg:ml-5">{cartCount}</div>) : (<div className="hidden"></div>)}
                        <Link href="/Cart_Page" className="px-5 hover:text-blue-500 transition duration-500 "><ShoppingCart size={25}/></Link>
                    </div>
                    <div className="px-5 hidden lg:block">
                        {session || session2 ? (session2 ? (<div className="p-2 border rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-500"><User/></div>) : (<img src={ session.user.image} alt="Poli Collective Logo" title={session.user.name} className="w-10 cursor-pointer rounded-full"/>)) : ( <button className="px-5 cursor-pointer bg-black h-10 w-22 text-white rounded-md hover:bg-gray-500 transition duration-500 text-sm" onClick={() => setShowLoginModal(true)}>Login</button>)}
                    </div>
                    <div className="px-5 py-3 lg:px-0">
                        <DarkMode theme={theme} setTheme={setTheme}/>
                    </div>
                    {session || session2 ? (<div className="px-5"><LogOut className="cursor-pointer hover:text-blue-500 transition duration-500 hidden lg:block" onClick={() => {signOut("google"), setSession2(false), sessionStorage.removeItem("session2")}} /></div>) : (<div className="hidden">asd</div>)}
                </div>
            </div>
            <div className="relative z-2">
                <div className="absolute top-0 left-0 w-full">
                    <div className="flex items-center justify-between py-3 px-3 lg:hidden">
                        <Menu className=" lg:hidden cursor-pointer" onClick={() => setIsOpen(true)} size={30}/>
                        <div className="flex">
                            <div className="flex flex-col items-center justify-center">
                                {cartCount > 0 ? (<div className="absolute bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs top-1 ml-5">{cartCount}</div>) : (<div className="hidden">1</div>)}
                                <Link href="/Cart_Page" className="px-5 hover:text-blue-500 transition duration-500 "><ShoppingCart size={25}/></Link>
                            </div>
                            {session || session2 ? (session2 ? (<div className="p-2 border rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-500"><User/></div>) : (<img src={session.user.image} alt="Poli Collective Logo" title={session.user.name}className="w-10 cursor-pointer rounded-full"/>)) : ( <button className="px-5 cursor-pointer bg-black h-10 w-22 text-white rounded-md hover:bg-gray-700 transition duration-500 text-sm" onClick={() => setShowLoginModal(true)}>Login</button>)}
                            {session || session2 ? (<div className="pl-3"><LogOut className="cursor-pointer hover:text-blue-500 transition duration-500 " onClick={() => {signOut("google"), setSession2(false), sessionStorage.removeItem("session2")}} /></div>) : (<div className="hidden">asd</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}