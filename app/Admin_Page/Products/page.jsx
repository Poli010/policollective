'use client'
import Admin_Header from "@/components/Admin_Page/Admin_Header/Admin_Header";
import Admin_SideBar from "@/components/Admin_Page/Admin_SideBar/Admin_SideBar";
import { useState } from "react";

export default function Products(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return(
        <>
            <div className="lg:flex max-w-400 mx-auto">
                <Admin_SideBar idebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <div className={`w-full pt-5 px-4 md:px-7 bg-gray-50 dark:bg-gray-950 ${isSidebarOpen ? 'h-screen overflow-hidden' : ''}`}>
                    <Admin_Header/>
                </div>
            </div>
        </>
    );
}