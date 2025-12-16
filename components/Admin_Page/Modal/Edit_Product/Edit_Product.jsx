import { Loader, X } from "lucide-react";

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
    handleEditProductSubmit,
    variants,
    handleVariantValue,
    isSubmit
}){
    return(
        <>
            <div className={`fixed top-0 bg-black w-full z-20 left-0 h-screen opacity-80 ${isEdit_ProductOpen ? 'scale-100' : 'scale-0'}`} onClick={closeModal}></div>
            <div className={`fixed top-1/2 left-1/2 transform -translate-1/2 bg-white dark:bg-gray-900 min-h-[400px] w-[90%] lg:w-[500px] rounded-md shadow-2xl transition duration-500 z-30 ${isEdit_ProductOpen ? 'scale-100' : 'scale-0'}`}>
                <h1 className="text-2xl text-center font-semibold mt-2">Edit Product</h1>
                <X className="fixed top-3 right-3 cursor-pointer" onClick={closeModal}/>
                <form className="px-3 lg:px-10 h-[85vh] lg:max-h-[650px] overflow-y-scroll" onSubmit={handleEditProductSubmit}>
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
                        <input inputMode="numeric" id="item_price" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. 250" value={item_price} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); setItem_price(onlyNumber)}} required/>
                    </div>
                    <div className="flex flex-col pt-5">
                        <label htmlFor="">Discount Percentage % (Optional):</label>
                        <input inputMode="numeric" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. 20" value={discount_pct} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); setDiscount_pct(onlyNumber)}}/>
                    </div>
                    <div className="flex flex-col pt-5">
                        <label htmlFor="item_name">Variants: *</label>
                        {variants?.map((variant, index) => (
                            <div className="grid grid-cols-2 pb-5" key={index}>
                                <div className="flex flex-col">
                                    <label htmlFor="item_name">Size: *</label>
                                    <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Small, Medium, Large" value={variant.size || ""} onChange={(e) => handleVariantValue(index, "size", e.target.value)} autoComplete="off" required/>
                                </div>
                                <div className="flex flex-col pl-1">
                                    <label htmlFor="item_name">Color: (Optional)</label>
                                    <input type="text" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. Black, White" value={variant.color || ""} onChange={(e) => handleVariantValue(index, "color", e.target.value)} autoComplete="off"/>
                                </div>
                                <div className="flex flex-col pt-2 col-span-2">
                                    <label htmlFor="item_name">Quantity: *</label>
                                    <input inputMode="numeric" id="item_name" className="border border-gray-500 h-10 rounded-md outline-blue-500 px-3 text-sm" placeholder="ex. 10" value={variant.stock_quantity || ""} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); handleVariantValue(index, "stock_quantity", onlyNumber)}} autoComplete="off" required/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pb-2">
                        {isSubmit ? (<button className="bg-black/70 py-2 px-5 text-white rounded-md w-full flex justify-center"disabled><Loader size={18} className="animate-spin"/></button>) : (<button className="bg-black py-2 px-5 text-white rounded-md w-full cursor-pointer">Submit</button>)}
                    </div>
                </form>
            </div>
        </>
    );
}