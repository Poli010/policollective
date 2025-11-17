'use client'
import Link from "next/link";
import { LogOut, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function SideBar({setShowLoginModal}){
    const [cartCount, setCartCount] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();
    
      useEffect(() => {
        setMounted(true);
      }, []);
      // Prevent SSR mismatch
      if (!mounted) {
        return null;
      }

    return(
        <>  
            {isOpen ? (<X  className="fixed top-3 right-27 z-22 cursor-pointer lg:hidden" size={30} onClick={() => setIsOpen(false)}/>) : (<Menu className="absolute top-3 left-3 lg:hidden cursor-pointer" onClick={() => setIsOpen(true)} size={30}/>) }
            <div className={`fixed top-0 left-0 h-screen bg-gray-100  px-5 shadow-lg z-20 transform transition-transform duration-500 ease-in-out w-[80%] lg:flex lg:h-25 lg:w-full lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                {theme === 'dark' ? (<img src='/Logo/darkMode_logo.png' alt="Poli Collective Logo" title="Poli Collective Logo" className="w-[100px] cursor-pointer"/>) : (<img src='/Logo/landing.png' alt="Poli Collective Logo" title="Poli Collective Logo" className="w-[100px] cursor-pointer"/>) }
                <div className=" text-lg flex flex-col lg:flex-row lg:items-center lg:w-full lg:justify-end">
                    <Link href="/" className="px-5 py-3 hover:text-blue-500 transition duration-500">Home</Link>
                    <Link href="/Shop_Now" className="px-5 py-3 hover:text-blue-500 transition duration-500">Shop Now</Link>
                    <Link href="/" className="px-5 py-3 hover:text-blue-500 transition duration-500">About</Link>
                    <Link href="/" className="px-5 py-3 hover:text-blue-500 transition duration-500">Contact</Link>
                    <div className="lg:flex flex-col lg:items-center py-3 hidden">
                        {cartCount ? (<div className="absolute bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-sm ml-8 -mt-4 lg:ml-5">1</div>) : (<div className="hidden">1</div>)}
                        <Link href="/" className="px-5 hover:text-blue-500 transition duration-500 "><ShoppingCart size={25}/></Link>
                    </div>
                    <div className="px-5 hidden lg:block">
                        {session ? (<img src={session.user.image} alt="Poli Collective Logo" title={session.user.name}className="w-10 cursor-pointer rounded-full"/>) : ( <button className="px-5 cursor-pointer bg-black h-10 w-22 text-white rounded-md hover:bg-gray-700 transition duration-500 text-sm" onClick={() => setShowLoginModal(true)}>Login</button>)}
                    </div>
                    <div className="px-5 py-3 lg:px-0">
                        <DarkMode theme={theme} setTheme={setTheme}/>
                    </div>
                    {session ? (<div className="px-5"><LogOut className="cursor-pointer hover:text-blue-500 transition duration-500 hidden lg:block" onClick={() => signOut("google")} /></div>) : (<div className="hidden">asd</div>)}
                </div>
            </div>
            <div className="flex items-center justify-end py-3 px-3 lg:hidden">
                <div className="flex flex-col items-center justify-center">
                    {cartCount ? (<div className="absolute bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-sm top-1 ml-5">1</div>) : (<div className="hidden">1</div>)}
                    <Link href="/" className="px-5 hover:text-blue-500 transition duration-500 "><ShoppingCart size={25}/></Link>
                </div>
                {session ? (<img src={session.user.image} alt="Poli Collective Logo" title={session.user.name}className="w-10 cursor-pointer rounded-full"/>) : ( <button className="px-5 cursor-pointer bg-black h-10 w-22 text-white rounded-md hover:bg-gray-700 transition duration-500 text-sm" onClick={() => setShowLoginModal(true)}>Login</button>)}
                {session ? (<div className="pl-3"><LogOut className="cursor-pointer hover:text-blue-500 transition duration-500 " onClick={() => signOut("google")} /></div>) : (<div className="hidden">asd</div>)}
      
            </div>
        </>
    );
}