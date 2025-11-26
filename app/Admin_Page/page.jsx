'use client'
import Admin_SideBar from "@/components/Admin_Page/Admin_SideBar/Admin_SideBar";
import { PhilippinePeso, TrendingUp } from "lucide-react";
import Area_Chart from "@/components/Admin_Page/Chart/Area_Chart";
import Admin_Header from "@/components/Admin_Page/Admin_Header/Admin_Header";

export default function Admin_Page(){
    return(
        <>
            <div className="lg:flex max-w-400 mx-auto">
                <Admin_SideBar/>
                <div className="w-full pt-5 px-4 md:px-7 bg-gray-50 dark:bg-gray-950 ">
                    <Admin_Header/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 ">
                        <section className="flex flex-col justify-center h-[25vh] xl:h-[195px] w-full rounded-xl shadow-xl bg-white border border-gray-300 px-3 dark:bg-gray-900 dark:border-gray-900">
                            <h1 className="font-semibold text-gray-500 dark:text-gray-300">Total Revenue</h1>
                            <p className="flex items-center mt-3"><PhilippinePeso size={25}/><span className="text-xl font-semibold">20,000.00</span></p>
                            <p className="mt-3 flex">Your total revenue this month.<span className="ml-3 flex bg-orange-200 text-orange-500 rounded-sm"><TrendingUp/>+20%</span></p>
                        </section>
                        <section className="flex flex-col justify-center h-[25vh] xl:h-[195px] w-full rounded-xl shadow-xl bg-white border border-gray-300 px-3 dark:bg-gray-900 dark:border-gray-900">
                            <h1 className="font-semibold text-gray-500 dark:text-gray-300">Total Orders</h1>
                            <p className="mt-3 text-xl font-semibold">200</p>
                            <p className="mt-3 flex">Your total orders this month.<span className="ml-3 flex bg-orange-200 text-orange-500 rounded-sm"><TrendingUp/>+20%</span></p>
                            <div className="flex items-center mt-1">
                                <p className="text-sm text-yellow-500">Pending: <span className="font-semibold">100</span></p>
                                <p className="ml-5 text-sm text-green-500">Delivered: <span className="font-semibold">100</span></p>
                            </div>
                        </section>
                        <section className="md:col-span-2 h-[50vh] xl:h-[300px] w-full rounded-xl shadow-xl  border border-gray-300 dark:border-gray-800  outline-none">
                            <Area_Chart/>
                        </section>
                    </div>
                </div>
            </div>
      
        </>
    );
}