import { X } from "lucide-react";

export default function Edit_Product({
    isEdit_ProductOpen,
    closeModal,
    item_name,
    setItem_name,
    item_price,
    setItem_price,
    description,
    setDescription,
    discount_pct,
    setDiscount_pct,
    handleEditProductSubmit
}){
    return(
        <>
            <div className={`fixed top-0 bg-black w-full z-20 left-0 h-screen opacity-80 ${isEdit_ProductOpen ? 'scale-100' : 'scale-0'}`} onClick={closeModal}></div>
            <div className={`fixed top-1/2 left-1/2 transform -translate-1/2 bg-white min-h-[400px] w-[500px] rounded-md shadow-2xl transition duration-500 z-30 ${isEdit_ProductOpen ? 'scale-100' : 'scale-0'}`}>
                <h1 className="text-2xl text-center font-semibold mt-2">Edit Product</h1>
                <X className="fixed top-3 right-3 cursor-pointer" onClick={closeModal}/>
                <form className="px-10" onSubmit={handleEditProductSubmit}>
                    <div className="flex flex-col pt-5">
                        <label htmlFor="item_name">Item Name:</label>
                        <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Nissan Shirt Black" value={item_name} onChange={(e) => setItem_name(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pt-5">
                        <label htmlFor="description">Description:</label>
                        <textarea type="text" id="description" className="border border-gray-500 rounded-md outline-blue-500 p-3 text-sm" placeholder="Your item description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pt-5">
                        <label htmlFor="item_price">Item Price:</label>
                        <input type="number" id="item_price" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. 250" value={item_price} onChange={(e) => setItem_price(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col pt-5">
                        <label htmlFor="">Discount Percentage % (Optional):</label>
                        <input type="number" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. 20" value={discount_pct} onChange={(e) => setDiscount_pct(e.target.value)}/>
                    </div>
                    <div className="py-5 ">
                        <button className="bg-black py-2 px-5 text-white rounded-md w-full cursor-pointer">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}