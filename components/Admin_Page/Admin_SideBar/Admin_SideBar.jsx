'use client'
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Wallet, Tag, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
export default function Admin_SideBar(){
    const [activeLink, setActiveLink] = useState("");
    useEffect(() => {
        const whatIsActiveLink = localStorage.getItem("active-link");
        if(whatIsActiveLink){
            setActiveLink(whatIsActiveLink);
        }
    }, []);

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
            <div className="border-r border-gray-300 shadow-2xl h-screen w-[25%] xl:w-[20%] px-3">
                <img src="/Logo/landing.png" alt="" className="w-25"/>
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