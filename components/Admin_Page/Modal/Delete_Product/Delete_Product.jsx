import { CircleAlert, LoaderCircle } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export default function Delete_Product({deleteModal, closeModal, product_id}){
    const [isClicked, setIsClicked] = useState(false);
    const deleteProduct = async() => {
        setIsClicked(true);
        try{
            const response = await axios.post('/api/admin_page/products/delete_products', {
                product_id: product_id
            });
            if(response.status === 200){
                window.location.reload();
            }
        }catch(err){
            if(err.response){
                setIsClicked(false);
                console.log(err.response.data.message);
            }
        }
    }
    return(
        <>
            <div className={`fixed top-0 left-0 bg-black w-full h-screen z-20 opacity-70 ${deleteModal ? 'scale-100' : 'scale-0'}`}></div>
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 h-[250px] w-[95%] sm:w-[400px] rounded-md transition duration-500 shadow-xl z-30 ${deleteModal ? 'scale-100' : 'scale-0'}`}>
                <div className="flex flex-col items-center">
                    <h1 className="bg-red-100 p-2 rounded-[50%] mt-8"><CircleAlert color="red" width={50} height={50} strokeWidth={1}/></h1>
                    <h1 className="font-bold text-[1.2rem] mt-1">Warning</h1>
                    <h1 className="text-sm mt-1">Are you sure to delete this product?</h1>
                </div>
                <div className="mt-8 flex justify-center">
                    <div className="flex justify-between w-[300px]">
                        <button className="bg-gray-200 text-black h-9 rounded-md w-[140px] cursor-pointer hover:bg-gray-300 transition duration-500" onClick={closeModal}>Cancel</button>
                        {isClicked ? ( <button className="flex items-center justify-center h-9 w-[140px] bg-red-500 rounded-md text-white opacity-80" disabled>Confirming<LoaderCircle size={18} className="animate-spin"/></button>) : 
                        (<button className="w-[140px] cursor-pointer h-9 bg-red-500 hover:bg-red-700 transition duration-500 rounded-md text-white" onClick={deleteProduct}>Confirm</button>)} 
                    </div>
                </div>
            </div>
        </>
    );
}
