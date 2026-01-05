'use client'
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { PhilippinePeso, ShoppingCart, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function Cart_Page(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const {theme} = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [product, setProduct] = useState([]);
    const router = useRouter();

    useEffect(() => {
        document.title = "Your Shopping Cart - Poli Collective"
        const storedCart = JSON.parse(localStorage.getItem('Cart')) || [];
        setProduct(storedCart);
    }, [])
    function toTitleCase(str){
        if(!str){
            return "";
        }
        else{
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
    }

    const handleAddQuantity = (product_id, size, color) => {
        const existingDatainCart = product.findIndex((p) => {
            return(
                p.product_id === product_id && 
                p.selected_size === size &&
                p.selected_color === color
            );
        });
        if(existingDatainCart !== -1){
            const updateCartQuantity = [...product];
           if(updateCartQuantity[existingDatainCart].quantity === 10){
                return null
            }
            else{
                updateCartQuantity[existingDatainCart].quantity += 1;
                setProduct(updateCartQuantity);
                localStorage.setItem("Cart", JSON.stringify(updateCartQuantity));
            }
        }
    }

    const handleSubtractQuantity = (product_id, size, color) => {
        const existingDatainCart = product.findIndex((p) => {
            return(
                p.product_id === product_id && 
                p.selected_size === size &&
                p.selected_color === color
            );
        });
        if(existingDatainCart !== -1){
            const updateCartQuantity = [...product];
            if(updateCartQuantity[existingDatainCart].quantity === 1){
                return null
            }
            else{
                updateCartQuantity[existingDatainCart].quantity -= 1;
                setProduct(updateCartQuantity);
                localStorage.setItem("Cart", JSON.stringify(updateCartQuantity));
            }
        }
    }

    const handleDeleteItem = (product_id, size, color) => {
        const deleteIteminCart = product.filter((p) => {
            return(
                    !(p.product_id === product_id && 
                    p.selected_size === size &&
                    p.selected_color === color)
                );
                
        });
        setCartCount(cartCount - 1);
        setProduct(deleteIteminCart);
        localStorage.setItem("Cart", JSON.stringify(deleteIteminCart));
    }
    //COMPUTE TOTAL PAYMENT
    const subtotal = product.reduce((total, item) => total + item.item_price * item.quantity, 0);

    const handleCheckOut = () => {
        router.push('/Check_Out?mode=cart');
    }

    return(
        <>
            <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen} cartCount={cartCount} setCartCount={setCartCount}/>
                <div className="py-30 px-3 lg:px-10 xl:px-20">
                    <h1 className="flex items-center justify-center font-bold text-lg lg:text-2xl">YOUR SHOPPING CART <ShoppingCart className="lg:ml-1"/></h1>
                     {product.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8 mt-10">
                        <div className="flex-1 space-y-6">
                            {product.map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row border-b border-gray-200 dark:border-gray-900 pb-4">
                                    <div className="h-48 w-full sm:w-48 shrink-0 overflow-hidden rounded-lg">
                                        <img src={`/uploads/${encodeURIComponent(item.image)}`} alt={item.item_name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 flex flex-col justify-between">
                                        <div>
                                            <p className="font-semibold text-lg">{item.item_name.toUpperCase()}</p>
                                            <p className="text-gray-600 text-sm">Color: {toTitleCase(item.selected_color)}</p>
                                            <p className="text-gray-600 text-sm">Size: {toTitleCase(item.selected_size)}</p>
                                        </div>
                                        <div className="mt-3 flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => handleSubtractQuantity(item.product_id, item.selected_size, item.selected_color)}>−</button>
                                                <span className="px-4">{item.quantity}</span>
                                                <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={() => handleAddQuantity(item.product_id, item.selected_size, item.selected_color)}>+</button>
                                            </div>
                                            <button className="flex items-center bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer" onClick={() => handleDeleteItem(item.product_id, item.selected_size, item.selected_color)}>
                                                <Trash size={18} className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-6 flex items-center">
                                        <p className="font-semibold text-lg flex items-center"><PhilippinePeso size={16} /> {item.item_price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full lg:w-1/3 border border-gray-200 rounded-lg p-6 h-fit dark:border-gray-900">
                            <p className="text-lg font-semibold mb-4">Order Summary</p>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span className="flex items-center"><PhilippinePeso size={16} /> {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="text-sm italic text-gray-500 mb-4">
                                <span className="text-sm">Taxes and shipping will be calculated at checkout</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg mt-4">
                                <span>Total</span>
                                <span className="flex items-center"><PhilippinePeso size={18} /> {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <button className="bg-black w-full text-white py-2 rounded-md mt-4 cursor-pointer hover:bg-black/70 transition duration-500" onClick={handleCheckOut}>Check out</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <img src="/Logo/empty_cart.svg" alt="Empty Cart" className="w-64 h-64 object-contain" />
                        <p className="text-gray-600 mt-4">Your cart is empty.</p>
                    </div>
                )}

                </div>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
        </>
    );
}