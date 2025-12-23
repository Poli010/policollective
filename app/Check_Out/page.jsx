'use client'
import DarkMode from "@/components/SideBar/DarkMode";
import { ShoppingCart, PhilippinePeso, Wallet, HandCoins, Motorbike } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { useTheme } from "next-themes";

export default function Check_Out(){
    const router = useRouter();
    const [phone_number, setPhone_number] = useState('');
    const [regions, setRegions] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selected_region, setSelected_region] = useState("");
    const [selected_provinces, setSelected_provinces] = useState("");
    const [selected_cities, setSelected_cities] = useState("");
    const [selected_barangay, setSelected_barangay] = useState("");
    const [selected_payment, setSelected_payment] = useState("");
    const [selected_shipping, setSelected_shipping] = useState("");
    const [shippingFee, setShippingFee] = useState(0);
    const [cartData, setCartData] = useState([]);
    const {theme, setTheme} = useTheme();
    console.log(`Region: ${selected_region}, Province: ${selected_provinces}, City: ${selected_cities}, Brgy: ${selected_barangay}`)
    useEffect(() => {
        const cartLocal = localStorage.getItem("Cart") || [];
        setCartData(JSON.parse(cartLocal));
        const fetchRegion = async() => {
            try{
                const response = await axios.get('/api/endUser_page/country_address/region');
                if(response.status === 200){
                    setRegions(response.data.result);
                }
            }
            catch(err){
                if(err.response){
                    console.log(err.response.data.message);
                }
            }
        }

        const fetchProvinces = async() => {
            if(!selected_region) return
            try{
                const response = await axios.get('/api/endUser_page/country_address/provinces',{
                    params: {region: selected_region}
                });
                if(response.status === 200){
                    setProvinces(response.data.result);
                }
            }
            catch(err){
                if(err.response){
                    console.log(err.response.data.message);
                }
            }
        }

        const fetchCities = async() => {
            if(!selected_provinces) return
            try{
                const response = await axios.get('/api/endUser_page/country_address/cities',{
                    params: {province_code: selected_provinces}
                });
                if(response.status === 200){
                    setCities(response.data.result);
                }
            }
            catch(err){
                if(err.response){
                    console.log(err.response.data.message);
                    console.log(err.message)
                }
            }
        }

        const fetchBarangays = async() => {
            if(!selected_cities) return
            try{
                const response = await axios.get('/api/endUser_page/country_address/barangay',{
                    params: {city_municipality_code: selected_cities}
                });
                if(response.status === 200){
                    setBarangays(response.data.result);
                }
            }
            catch(err){
                if(err.response){
                    console.log(err.response.data.message);
                    console.log(err.message)
                }
            }
        }
        fetchRegion();
        fetchProvinces();
        fetchCities();
        fetchBarangays();

        if(!selected_region || !selected_provinces || !selected_cities || !selected_barangay){
            setShippingFee(0);
            return;
        }

        const FREE_BARANGAYS = [
            "31420002",
            "31420004",
            "31420008",
            "31420010",
            "31420003"
        ];
        
        //FREE / NEAR BARANGAYS (SJDM only)
        if (selected_region === "03" && selected_provinces === "314" && selected_cities === "31420" && FREE_BARANGAYS.includes(selected_barangay)) {
            setShippingFee(1);
            setSelected_shipping("poliRider");
        }

        // SAME CITY (SJDM but far barangay)
        else if (selected_cities === "31420") {
            setShippingFee(25);
            setSelected_shipping("poliRider");
        }

        //SAME PROVINCE (Bulacan)
        else if (selected_region === "03" && selected_provinces === "314") {
            setShippingFee(75);
            setSelected_shipping("JnT");
        }

        //REGION III (Zambales, Aurora, Pampanga, etc.)
        else if (selected_region === "03") {
            setShippingFee(125);
            setSelected_shipping("JnT");
        }

        //NCR
        else if (selected_region === "13") {
            setShippingFee(90);
            setSelected_shipping("JnT");
        }

        //NEAR LUZON
        else if (["01", "04", "14"].includes(selected_region)) {
            setShippingFee(160);
            setSelected_shipping("JnT");
        }

        //FAR LUZON
        else if (["02", "17", "05"].includes(selected_region)) {
            setShippingFee(180);
            setSelected_shipping("JnT");
        }

        //VISAYAS
        else if (["06", "07", "08"].includes(selected_region)) {
            setShippingFee(280);
            setSelected_shipping("JnT");
        }

        //MINDANAO
        else {
            setShippingFee(320);
            setSelected_shipping("JnT");
        }
        
        
    }, [selected_region, selected_provinces, selected_cities, selected_barangay]);

    //COMPUTE TOTAL PAYMENT

    const subtotal = cartData.reduce((total, data) => total + data.item_price * data.quantity, 0);
    const totalPayment = subtotal + shippingFee;
    return(
        <>
            <div className="h-auto max-w-400 mx-auto px-3 md:px-10 xl:px-40 ">
                <div className="flex items-center justify-between lg:pl-16 xl:pl-26">
                    <div className="w-32">
                        <img src="/Logo/landing.png" alt="Poli Collective Logo" className="w-full h-full cursor-pointer" onClick={() => router.push('/')}/>
                    </div>
                    <div className="flex items-center">
                        <ShoppingCart onClick={() => router.push('/Cart_Page')} className="mr-3"/>
                        <DarkMode theme={theme} setTheme={setTheme}/>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold lg:pl-20 xl:pl-30">Delivery</h1>
                    <form className="grid grid-cols-1 lg:grid-cols-3 ">
                        {/* First Box */}
                        <div className="lg:order-1 lg:col-span-2  lg:pr-10 lg:pl-20 xl:pl-30">
                            <div className="relative  mt-3 lg:mt-7">
                                <input type="email" id="email" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-600"/>
                                <label htmlFor="email" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Email *</label>
                            </div>
                            <div className="relative  mt-7">
                                <input inputMode="numeric" placeholder="" maxLength={12} id="phone_number" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500" value={phone_number} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); setPhone_number(onlyNumber)}}/>
                                <label htmlFor="phone_number" placeholder="" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Phone Number *</label>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-center items-center ">
                                <div className="relative w-full mt-7">
                                    <input type="text" id="first_name" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500"/>
                                    <label htmlFor="first_name" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> First Name *</label>
                                </div>
                                <div className="relative w-full lg:ml-5 mt-7">
                                    <input type="text" id="last_name" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500"/>
                                    <label htmlFor="last_name" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Last Name *</label>
                                </div>
                            </div>
                            <div className="relative  mt-7">
                                <input type="text" id="address" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500"/>
                                <label htmlFor="address" placeholder="" className="absolute left-3 top-1/2  -translate-y-1/2 text-sm text-gray-500 bg-white px-1 overflow-hidden transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Address (house#, st, subdivision)*</label>
                            </div>
                            <div className="relative mt-7">
                                <Select value={selected_region} onValueChange={(value) => setSelected_region(value)}>
                                    <SelectTrigger className={`w-full min-h-12 border-gray-400 cursor-pointer`}>
                                        <SelectValue placeholder="Select Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Regions</SelectLabel>
                                        {regions.map((region, index) => (
                                            <SelectItem key={index} value={region.region_code}>{region.region_description.toUpperCase()}</SelectItem>
                                        ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="relative  mt-7">
                                <Select value={selected_provinces} onValueChange={(value) => setSelected_provinces(value)}>
                                    <SelectTrigger className={`w-full min-h-12 border-gray-400 cursor-pointer`}>
                                        <SelectValue placeholder="Select Province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Provinces</SelectLabel>
                                        {provinces.length > 0 ? (
                                            provinces.map((province, index) => (
                                                <SelectItem key={index} value={province.province_code}>{province.province_description}</SelectItem>
                                            ))
                                            ) : (<SelectItem key={`no-province`} value="." disabled>Select Region First</SelectItem>)
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="relative mt-7">
                                <Select value={selected_cities} onValueChange={(value) => setSelected_cities(value)}>
                                    <SelectTrigger className={`w-full min-h-12 border-gray-400 cursor-pointer`}>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Cities</SelectLabel>
                                        {cities.length > 0 ? (
                                            cities.map((city, index) => (
                                                <SelectItem key={index} value={city.city_municipality_code}>{city.city_municipality_description}</SelectItem>
                                            ))) : (<SelectItem key={`no-cities`} value="." disabled>Select Province First</SelectItem>)
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="relative mt-7">
                                <Select value={selected_barangay} onValueChange={(value) => setSelected_barangay(value)}>
                                    <SelectTrigger className={`w-full min-h-12 border-gray-400 cursor-pointer`}>
                                        <SelectValue placeholder="Select Barangay" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Barangays</SelectLabel>
                                        {barangays.length > 0 ? (
                                            barangays.map((barangay, index) => (
                                                <SelectItem key={index} value={barangay.barangay_code}>{barangay.barangay_description}</SelectItem>
                                            ))) : (<SelectItem key={`no-barangay`} value="." disabled>Select City First</SelectItem>)
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-7">
                                <p className="text-lg font-semibold">Shipping method</p>
                                {selected_barangay === "" ? (
                                    <p className="bg-gray-100 p-5 rounded-md text-gray-600 text-sm">Fill up your address first to show shipping method</p>
                                ) : selected_cities === "31420" ? (
                                    <div>
                                        <label htmlFor="poliRider" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-500 mb-3">
                                            <span className="flex items-center"><Motorbike size={20} className="mr-3"/>Poli Collective Rider</span> 
                                            <span><input type="radio" id="poliRider" className="h-4 w-4 accent-blue-500" value="poliRider" checked={selected_shipping === "poliRider"} onChange={() => setSelected_shipping('poliRider')}/></span>
                                        </label>
                                        <p className="bg-gray-100 p-5 rounded-md text-gray-600 text-justify text-sm">Estimated delivery: 7–14 business days (includes order preparation and shipping). May arrive earlier. If your parcel hasn’t arrived after this period, please contact us.</p>
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="JnT" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-500 mb-3">
                                            <span className="flex items-center"><img src="/Logo/JnT.png" alt="J&T Logo" className="w-10 h-10 mr-3 object-contain"/>J&T Express</span> 
                                            <span><input type="radio" id="JnT" className="h-4 w-4 accent-blue-500" value="JnT" checked={selected_shipping === "JnT"} onChange={() => setSelected_shipping('JnT')}/></span>
                                        </label>
                                        <label htmlFor="spx" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-500 mb-3">
                                            <span className="flex items-center"><img src="/Logo/spx.svg" alt="J&T Logo" className="w-10 h-10 mr-3 object-contain"/>SPX Express</span> 
                                            <span><input type="radio" id="spx" className="h-4 w-4 accent-blue-500" value="spx" checked={selected_shipping === "spx"} onChange={() => setSelected_shipping('spx')}/></span>
                                        </label>
                                        <p className="bg-gray-100 p-5 rounded-md text-gray-600 text-justify text-sm">Estimated delivery: 7–14 business days (includes order preparation and shipping). May arrive earlier. If your parcel hasn’t arrived after this period, please contact us.</p>
                                    </div>
                                ) }
                            </div>
                        </div>
                            {/* second Box */}
                        <div className="mt-3 pb-5 lg:order-4 lg:col-span-2  lg:pr-10 lg:pl-20 xl:pl-30">
                            <p className="text-lg font-semibold">Payment method</p>
                            <label htmlFor="gcash" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-500">
                                <span className="flex items-center"><img src="/Logo/gcash.svg" alt="Gcash Logo" className=" w-8 h-8 lg:w-10 lg:h-10 mr-3"/>Gcash</span> 
                                <span><input type="radio" id="gcash" className="h-4 w-4 accent-blue-500" value="gcash" checked={selected_payment === "gcash"} onChange={() => setSelected_payment('gcash')}/></span>
                            </label>
                            <label htmlFor="maya" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md mt-3 cursor-pointer hover:bg-gray-200 transition duration-500">
                                <span className="flex items-center"><img src="/Logo/maya.svg" alt="Maya Logo" className="w-8 h-8 lg:w-10 lg:h-10 mr-3"/>Maya</span> 
                                <span><input type="radio" id="maya" className="h-4 w-4 accent-blue-500"  value="maya" checked={selected_payment === "maya"} onChange={() => setSelected_payment('maya')}/></span>
                            </label>
                            <label htmlFor="card" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md mt-3 cursor-pointer hover:bg-gray-200 transition duration-500">
                                <span className="flex items-center"><Wallet size={20} className="mr-3"/> Debit/Credit Card</span> 
                                <span><input type="radio" id="card" className="h-4 w-4 accent-blue-500"  value="card" checked={selected_payment === "card"} onChange={() => setSelected_payment('card')}/></span>
                            </label>
                            {selected_cities === "31420" ? (
                                <label htmlFor="COD" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md mt-3 cursor-pointer hover:bg-gray-200 transition duration-500">
                                    <span className="flex items-center"><HandCoins size={20} className="mr-3"/> Cash on Delivery (COD)</span> 
                                    <span><input type="radio" id="COD" className="h-4 w-4 accent-blue-500"  value="COD" checked={selected_payment === "COD"} onChange={() => setSelected_payment('COD')}/></span>
                                </label>
                            ) :(
                                <label htmlFor="COD" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 bg-gray-200 text-gray-500 rounded-md mt-3 pointer-events-none">
                                    <span className="flex items-center"><HandCoins size={20} className="mr-3"/> Cash on Delivery (COD)</span> 
                                    <span><input type="radio" id="COD" className="h-4 w-4 accent-blue-500"  value="COD" checked={selected_payment === "COD"} onChange={() => setSelected_payment('COD')}/></span>
                                </label>
                            )}
                        </div>
                            {/* THIRD Box */}
                        <div className="py-5 lg:order-3 ">
                            <h1>Order Summary</h1>
                            <div className="max-h-[350px] overflow-y-auto overflow-hidden px-2">
                                {cartData.map((cart, index) => (
                                    <div className="flex items-center py-5" key={index}>
                                        <div className="relative border border-gray-300 rounded-md w-25 h-20">
                                            <p className="absolute -top-2 -right-1 py-0.5 px-3 bg-black text-white rounded-md">{cart.quantity}</p>
                                            <img src={`/uploads/${encodeURIComponent(cart.image)}`} alt={cart.item_name} className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="w-full flex justify-between pl-2">
                                            <div>
                                                <p>Nissan Shirt</p>
                                                <p className="text-gray-600 text-sm">Size: {cart.selected_size}</p>
                                                <p className="text-gray-600 text-sm">Color: {cart.selected_color}</p>
                                            </div>
                                            <div>
                                                <p className="flex items-center"><PhilippinePeso size={16} /> {cart.item_price * cart.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span className="flex items-center"><PhilippinePeso size={16} /> {subtotal}</span>
                            </div>
                            <div className="flex  justify-between mb-2">
                                <span className="text-sm">Delivery/Shipping</span>
                                {shippingFee === 1 ? <p>Free</p> : shippingFee === 0 ? <span className="flex items-center text-sm text-gray-600 italic">Please fill up address first</span>  : <span className="flex items-center"><PhilippinePeso size={16} />{shippingFee}</span> }
                            </div>
                            <div className="flex justify-between font-semibold text-lg mt-4">
                                <span>Total</span>
                                <span className="flex items-center"><PhilippinePeso size={18} /> {totalPayment}</span>
                            </div>
                        </div>
                            {/* fourth Box */}
                        <div className=" lg:order-4 lg:col-span-2 lg:pr-10 lg:pl-20 xl:pl-30">
                            <p className="text-sm text-gray-600 py-3 text-center">By clicking <span className="font-medium">“Place Order”</span>, you agree to our <a href="/Policies/Terms_of_Use" target="_blank" className="underline hover:text-black">Terms of Use</a> and <a href="/Policies/Privacy_Policy" target="_blank"  className="underline hover:text-black">Privacy Policy</a>.</p>
                            <button className=" w-full mb-10 py-3 rounded-md bg-black text-white cursor-pointer hover:bg-black/70 transition">Place order</button>    
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}