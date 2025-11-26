'use client'
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Wallet, Tag, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Admin_SideBar(){
    const [activeLink, setActiveLink] = useState("");
    const [mounted, setMounted] = useState(false);
    const {theme} = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        const whatIsActiveLink = localStorage.getItem("active-link");
        if(whatIsActiveLink){
            setActiveLink(whatIsActiveLink);
        }
    }, []);
    if(!mounted){
        return null;
    }
    const handleActive = (value) => {
        setActiveLink(value);
        localStorage.setItem("active-link", value);
    }
    
    const handleLogout = () => {
        localStorage.removeItem("active-link");
        localStorage.removeItem("email");
    }
    return(
        <>
            <Menu className="fixed top-4 left-3 cursor-pointer lg:hidden " size={30} onClick={() => setIsSidebarOpen(true)}/>
            <div className={`fixed border-r border-gray-300 z-20 bg-white dark:border-r-gray-900 dark:bg-gray-900 shadow-2xl h-screen w-[80%] lg:static lg:opacity-100 lg:translate-0 lg:w-[25%] xl:w-[20%] px-3 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full  opacity-0'}`}>
            <X className="absolute top-4 right-5 z-30 cursor-pointer lg:hidden" size={30} onClick={() => setIsSidebarOpen(false)}/>
                {theme === "dark" ? (<img src="/Logo/darkMode_logo.png" alt="" className="w-25"/>) : (<img src="/Logo/landing.png" alt="" className="w-25"/>) }
                <div className="">
                    <div className="py-2">
                        <Link href="/Admin_Page" className={`flex h-10 items-center hover:bg-gray-700 hover:text-white rounded-lg px-2 transition  ${activeLink === "dashboard" ? 'bg-gray-700 text-white' : ''}`} onClick={() => handleActive("dashboard")}><LayoutDashboard/><span className="ml-2">Dashboard</span></Link>
                    </div>
                    <div className="py-2">
                        <Link href="#" className={`flex h-10 items-center hover:bg-gray-700 hover:text-white rounded-lg px-2 transition ${activeLink === "products" ? 'bg-gray-700 text-white' : ''}`} onClick={() => handleActive("products")}><Tag/><span className="ml-2">Products</span></Link>
                    </div>
                    <div className="py-2">
                        <Link href="#" className={`flex h-10 items-center hover:bg-gray-700 hover:text-white rounded-lg px-2 transition  ${activeLink === "orders" ? 'bg-gray-700 text-white' : ''}`} onClick={() => handleActive("orders")}><ShoppingCart/><span className="ml-2">Orders</span></Link>
                    </div>
                    <div className="py-2">
                        <Link href="#" className={`flex h-10 items-center hover:bg-gray-700 hover:text-white rounded-lg px-2 transition ${activeLink === "earnings" ? 'bg-gray-700 text-white' : ''}`} onClick={() => handleActive("earnings")}><Wallet/><span className="ml-2">Earnings</span></Link>
                    </div>
                    <div className="py-2">
                        <Link href="/" className={`flex h-10 items-center hover:bg-gray-700 hover:text-white rounded-lg px-2 transition  ${activeLink === "logout" ? 'bg-gray-700 text-white' : ''}`} onClick={handleLogout}><LogOut/><span className="ml-2">Logout</span></Link>
                    </div>
                </div>
            </div>
            
        </>
    );
}