import { X } from "lucide-react";

export default function View_SizeChart_FS({openSizeChart, size_chart,closeSizeChart}){
    return(
        <>
            <div className={`fixed top-1/2 left-1/2 transform -translate-1/2 bg-white dark:bg-gray-900 h-screen w-full z-20 transition duration-500 ${openSizeChart ? 'scale-100' : 'scale-0'}`}>
                <X size={30} className="fixed top-8 right-5 cursor-pointer" onClick={closeSizeChart}/>
                <img src={`/uploads/${encodeURIComponent(size_chart)}`} alt="Size Chart" className="object-contain h-full w-full"/>
            </div>
        </>
    );
}