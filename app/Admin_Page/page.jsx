'use client'
import Admin_SideBar from "@/components/Admin_Page/Admin_SideBar/Admin_SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PhilippinePeso, TrendingUp } from "lucide-react";
import Area_Chart from "@/components/Admin_Page/Chart/Area_Chart";
import Admin_Header from "@/components/Admin_Page/Admin_Header/Admin_Header";


export default function Admin_Page(){

    return(
        <>
            <div className="flex max-w-400 mx-auto">
                <Admin_SideBar/>
                <div className="w-full pt-5 px-7 bg-gray-50">

                    {/*--------------------DASHBOARD HEADER---------------*/}
                    <Admin_Header/>
                    {/*--------------------DASHBOARD HEADER END---------------*/}


                    {/*--------------------DASHBOARD CONTAINER---------------*/}
                    <div className="grid grid-cols-2 gap-5 mt-10">
                        <section className="flex flex-col justify-center h-[25vh] xl:h-[195px] w-full rounded-xl shadow-xl bg-white border border-gray-300 px-3">
                            <h1 className="font-semibold text-gray-500 ">Total Revenue</h1>
                            <p className="flex items-center mt-3"><PhilippinePeso size={25}/><span className="text-xl font-semibold">20,000.00</span></p>
                            <p className="mt-3 flex">Your total revenue this month.<span className="ml-3 flex bg-orange-200 text-orange-500 rounded-sm"><TrendingUp/>+20%</span></p>
                        </section>
                        <section className="flex flex-col justify-center h-[25vh] xl:h-[195px] w-full rounded-xl shadow-xl bg-white border border-gray-300 px-3">
                            <h1 className="font-semibold text-gray-500 ">Total Orders</h1>
                            <p className="mt-3 text-xl font-semibold">200</p>
                            <p className="mt-3 flex">Your total orders this month.<span className="ml-3 flex bg-orange-200 text-orange-500 rounded-sm"><TrendingUp/>+20%</span></p>
                            <div className="flex items-center mt-1">
                                <p className="text-sm text-yellow-500">Pending: <span className="font-semibold">100</span></p>
                                <p className="ml-5 text-sm text-green-500">Delivered: <span className="font-semibold">100</span></p>
                            </div>
                        </section>
                        <section className="col-span-2 h-[50vh] xl:h-[300px] w-full rounded-xl shadow-xl bg-white border border-gray-300">
                            <Area_Chart/>
                        </section>
                    </div>
                    {/*--------------------DASHBOARD CONTAINER END---------------*/}


                </div>
            </div>
      
        </>
    );
}