'use client'
import { useState } from "react";
import Admin_SideBar from "@/components/Admin_Page/Admin_SideBar/Admin_SideBar";
import Admin_Header from "@/components/Admin_Page/Admin_Header/Admin_Header";
export default function Orders(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return(
        <>
            <div className="lg:flex mx-auto">
                <Admin_SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                <div className="w-full pt-5 md:px-7 bg-gray-50 dark:bg-gray-950">
                    <Admin_Header/>
                    <div className="bg-white h-auto md:h-[83vh] mt-3 dark:bg-gray-900 rounded-md">
                        <div className="mt-6 overflow-x-auto h-[80vh]">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="">
                                        <th className="px-6 py-4 text-left font-medium">Order</th>
                                        <th className="px-6 py-4 text-left font-medium">Customer</th>
                                        <th className="px-6 py-4 text-center font-medium">Details</th>
                                        <th className="px-6 py-4 text-center font-medium">Parcel</th>
                                        <th className="px-6 py-4 text-right font-medium">Amount</th>
                                        <th className="px-6 py-4 text-center font-medium">Payment</th>
                                        <th className="px-6 py-4 text-center font-medium">Status</th>
                                        <th className="px-6 py-4 text-center font-medium">Date</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    <tr className="group hover:bg-gray-200 transition">
                                        <td className="px-6 py-5 font-semibold text-gray-900">POLI-2025-0001</td>
                                        <td className="px-6 py-5 text-gray-900">Arnold Ivan Policarpio</td>
                                        <td className="px-6 py-5 text-center">
                                            <button className="text-gray-900 hover:text-blue-500 transition cursor-pointer">
                                            View →
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                            Processing
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right font-semibold">₱250.00</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                                            GCash
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full bg-yellow-200 px-3 py-1 text-xs font-medium text-yellow-700">
                                            Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center text-gray-900">Dec 12, 2025</td>
                                    </tr>
                                    <tr className="group hover:bg-gray-200 transition">
                                        <td className="px-6 py-5 font-semibold text-gray-900">POLI-2025-0001</td>
                                        <td className="px-6 py-5 text-gray-900">Ruth Jane Sta Maria</td>
                                        <td className="px-6 py-5 text-center">
                                            <button className="text-gray-900 hover:text-blue-500 transition cursor-pointer">
                                            View →
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                            Processing
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right font-semibold">₱250.00</td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                                            Maya
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex items-center rounded-full bg-yellow-200 px-3 py-1 text-xs font-medium text-yellow-700">
                                            Paid
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center text-gray-900">Dec 12, 2025</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}