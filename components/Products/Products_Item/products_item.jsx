import Image from 'next/image';
import tryImage from '@/app/uploads/asd.png'
import tryImage2 from '@/app/uploads/sample2.png'
import { PhilippinePeso, Pencil, Trash2 } from 'lucide-react';

export default function Products_Item() {
    return (
        <>
            <div className='grid gap-5 grid-cols-3 '>
                <div className="">
                    <div className="w-60 shad bg-white dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                        <div className="relative w-full h-[250px] rounded-t-xl overflow-hidden">
                            <Image 
                                src={tryImage}
                                alt="temp"
                                fill
                                className="object-cover"
                            />
                            <p className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">20% OFF</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="font-semibold text-lg">Nissan Shirt</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Category: T-Shirt</p>
                            <div className='flex flex-row just items-center'>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Status: Active </p>
                                <p className='bg-yellow-500 rounded-full w-3 h-3 ml-1'></p>
                            </div>
                           
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p className="text-sm text-gray-500">Price:</p>
                                    <p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> 250</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Stock:</p>
                                    <p className="font-semibold text-center">5</p>
                                </div>
                            </div>
                        </div>
                        {/* ACTION BUTTONS */}
                        <div className="flex justify-between px-4 pb-4">
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Pencil size={16} /> Edit
                            </button>
                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                </div>  

                <div className="">
                    <div className="w-60 shad bg-white dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                        <div className="relative w-full h-[250px] rounded-t-xl overflow-hidden">
                            <Image 
                                src={tryImage}
                                alt="temp"
                                fill
                                className="object-cover"
                            />
                            <p className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">20% OFF</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="font-semibold text-lg">Nissan Shirt</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Category: T-Shirt</p>
                            <div className='flex flex-row just items-center'>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Status: Inactive </p>
                                <p className='bg-gray-500 rounded-full w-3 h-3 ml-1'></p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p className="text-sm text-gray-500">Price:</p>
                                    <p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> 250</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Stock:</p>
                                    <p className="font-semibold text-center">5</p>
                                </div>
                            </div>
                        </div>
                        {/* ACTION BUTTONS */}
                        <div className="flex justify-between px-4 pb-4">
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Pencil size={16} /> Edit
                            </button>
                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                </div>  

                <div className="">
                    <div className="w-60 shad bg-white dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                        <div className="relative w-full h-[250px] rounded-t-xl overflow-hidden">
                            <Image 
                                src={tryImage2}
                                alt="temp"
                                fill
                                className="object-cover"
                            />
                            <p className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">20% OFF</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="font-semibold text-lg">Nissan Shirt</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Category: T-Shirt</p>
                            <div className='flex flex-row just items-center'>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Status: Out of Stock </p>
                                <p className='bg-red-700 rounded-full w-3 h-3 ml-1'></p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p className="text-sm text-gray-500">Price:</p>
                                    <p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> 250</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Stock:</p>
                                    <p className="font-semibold text-center">0</p>
                                </div>
                            </div>
                        </div>
                        {/* ACTION BUTTONS */}
                        <div className="flex justify-between px-4 pb-4">
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Pencil size={16} /> Edit
                            </button>
                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                </div>  

                <div className="">
                    <div className="w-60 shad bg-white dark:bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                        <div className="relative w-full h-[250px] rounded-t-xl overflow-hidden">
                            <Image 
                                src={tryImage2}
                                alt="temp"
                                fill
                                className="object-cover"
                            />
                            <p className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">20% OFF</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="font-semibold text-lg">Nissan Shirt</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Category: T-Shirt</p>
                            <div className='flex flex-row just items-center'>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Status: Active </p>
                                <p className='bg-yellow-500 rounded-full w-3 h-3 ml-1'></p>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <p className="text-sm text-gray-500">Price:</p>
                                    <p className="flex items-center font-semibold"><PhilippinePeso size={18} className="mr-1" /> 250</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Stock:</p>
                                    <p className="font-semibold text-center">5</p>
                                </div>
                            </div>
                        </div>
                        {/* ACTION BUTTONS */}
                        <div className="flex justify-between px-4 pb-4">
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Pencil size={16} /> Edit
                            </button>
                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm cursor-pointer">
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>
                    </div>
                </div>  
            </div>
                
       
            
        </>
       
        
    );
}
