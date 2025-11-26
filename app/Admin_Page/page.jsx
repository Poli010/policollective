'use client'
import Admin_SideBar from "@/components/Admin_Page/Admin_SideBar/Admin_SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bell, User, PhilippinePeso, TrendingUp } from "lucide-react";
import Area_Chart from "@/components/Admin_Page/Chart/Area_Chart";


export default function Admin_Page(){
    const router = useRouter();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const whatIsEmail = localStorage.getItem("email");
        axios.get('/api/admin_page/dashboard',{
            params: {email: whatIsEmail}
        }).then(response => {
            if(response.status === 200){
                setUser(response.data.result)
            }
        }).catch(error => {
            if(error.response.status === 404 || error.response.status === 500){
                router.push("/");
            }
        })
    }, []);
    return(
        <>
            <div className="flex max-w-400 mx-auto">
                <Admin_SideBar/>
                <div className="w-full pt-5 px-7 bg-gray-50">

                    {/*--------------------DASHBOARD HEADER---------------*/}
                    <div className="flex justify-between">
                        <div>
                            <p className="text-gray-500 text-[12pt]">Welcome back, {user.fullname} 👋</p>
                            <h1 className="font-semibold text-5xl mt-1">Dashboard</h1>
                        </div>
                        <div className="flex h-9 items-center">
                            <div>
                                <div className="absolute ml-3 -mt-3 bg-red-500 text-white rounded-full w-5 h-5 text-center">1</div>
                                <Bell/>
                            </div>
                            <div className="p-2 border rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-500 ml-3">
                                <User />
                            </div>
                        </div>
                    </div>
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