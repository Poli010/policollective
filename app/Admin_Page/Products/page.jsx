'use client'
import Admin_Header from "@/components/Admin_Page/Admin_Header/Admin_Header";
import Admin_SideBar from "@/components/Admin_Page/Admin_SideBar/Admin_SideBar";
import Products_Data from "@/components/Products/Products_Item/products_item";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Add_Product from "@/components/Admin_Page/Modal/Add_Product/add_product";

export default function Products(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openAddProducts, setOpenAddProducts] = useState(false);
    return(
        <>
            <div className="lg:flex max-w-400 mx-auto">
                <Admin_SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <div className={`w-full pt-5 px-4 md:px-7 bg-gray-50 dark:bg-gray-950 ${isSidebarOpen ? 'h-screen overflow-hidden' : ''}`}>
                    <Admin_Header/>
                    <div className="bg-white h-auto md:h-[83vh] mt-3 dark:bg-gray-900 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-5">
                            <button className="flex items-center h-10 bg-black hover:bg-gray-700 text-white px-3 py-1.5 w-full rounded-md text-sm cursor-pointer" onClick={() => setOpenAddProducts(true)}><Plus/> Add Products</button>
                            <Select>
                                <SelectTrigger className="w-full border-black dark:border-white h-10">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Active<p className='bg-yellow-500 rounded-full w-3 h-3'></p></SelectItem>
                                    <SelectItem value="dark">Inactive<p className='bg-gray-500 rounded-full w-3 h-3'></p></SelectItem>
                                    <SelectItem value="system">Out of Stock<p className='bg-red-500 rounded-full w-3 h-3'></p></SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full border-black dark:border-white h-10">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Hoodie</SelectItem>
                                    <SelectItem value="dark">T-Shirt</SelectItem>
                                    <SelectItem value="system">Shoes</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex items-center">
                                <Search className="absolute left-1"/>
                                <input type="search" className="border border-black rounded-md pl-7 pr-2 outline-blue-500 dark:border-white w-full h-10 " placeholder={`Search here`}/>
                            </div>
                            
                        </div>

                        <div className="h-[70vh] md:overflow-y-scroll md:overflow-x-hidden p-5">
                            <Products_Data/>
                        </div>
                        
                    </div>
                </div>
            </div>

            <Add_Product openAddProducts={openAddProducts} setOpenAddProducts={setOpenAddProducts}/>
        </>
    );
}