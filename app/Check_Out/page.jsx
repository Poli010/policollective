'use client'
import DarkMode from "@/components/SideBar/DarkMode";
import { ShoppingCart, PhilippinePeso, Wallet } from "lucide-react";
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
    const [shippingFee, setShippingFee] = useState(0);
    const [cartData, setCartData] = useState([]);
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
        }

        // SAME CITY (SJDM but far barangay)
        else if (selected_cities === "31420") {
            setShippingFee(25);
        }

        //SAME PROVINCE (Bulacan)
        else if (selected_region === "03" && selected_provinces === "314") {
            setShippingFee(75);
        }

        //REGION III (Zambales, Aurora, Pampanga, etc.)
        else if (selected_region === "03") {
            setShippingFee(125);
        }

        //NCR
        else if (selected_region === "13") {
            setShippingFee(90);
        }

        //NEAR LUZON
        else if (["01", "04", "14"].includes(selected_region)) {
            setShippingFee(160);
        }

        //FAR LUZON
        else if (["02", "17", "05"].includes(selected_region)) {
            setShippingFee(180);
        }

        //VISAYAS
        else if (["06", "07", "08"].includes(selected_region)) {
            setShippingFee(280);
        }

        //MINDANAO
        else {
            setShippingFee(320);
        }
        
        
    }, [selected_region, selected_provinces, selected_cities, selected_barangay]);

    //COMPUTE TOTAL PAYMENT

    const subtotal = cartData.reduce((total, data) => total + data.item_price * data.quantity, 0);
    const totalPayment = subtotal + shippingFee;
    return(
        <>
            <div className="h-auto max-w-400 mx-auto px-32">
                <div className="flex items-center justify-between px-32">
                    <div className="w-32">
                        <img src="/Logo/landing.png" alt="Poli Collective Logo" className="w-full h-full cursor-pointer" onClick={() => router.push('/')}/>
                    </div>
                    <div className="flex items-center">
                        <ShoppingCart onClick={() => router.push('/Cart_Page')} className="mr-3"/>
                        <DarkMode/>
                    </div>

                </div>
                <div className="flex flex-col lg:flex-row  gap-2 h-screen px-30">
                    <div className="w-full p-5">
                        <h1 className="text-xl font-semibold">Delivery</h1>
                        <form className="">
                            <div className="relative w-[500px] mt-7">
                                <input type="email" id="email" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-600"/>
                                <label htmlFor="email" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Email *</label>
                            </div>
                            <div className="relative w-[500px] mt-7">
                                <input inputMode="numeric" placeholder="" maxLength={12} id="phone_number" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500" value={phone_number} onChange={(e) => {const onlyNumber = e.target.value.replace(/\D/g, ''); setPhone_number(onlyNumber)}}/>
                                <label htmlFor="phone_number" placeholder="" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Phone Number *</label>
                            </div>
                            <div className="flex items-center ">
                                <div className="relative w-60 mt-7">
                                    <input type="text" id="first_name" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500"/>
                                    <label htmlFor="first_name" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> First Name *</label>
                                </div>
                                <div className="relative w-60 ml-5 mt-7">
                                    <input type="text" id="last_name" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500"/>
                                    <label htmlFor="last_name" className="absolute text-sm left-3 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600  peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Last Name *</label>
                                </div>
                            </div>
                            <div className="relative w-[500px] mt-7">
                                 <input type="text" id="phone_number" placeholder="" className="peer w-full h-12 border border-gray-400 rounded-md px-3 focus:outline-none focus:border-blue-500"/>
                                <label htmlFor="phone_number" placeholder="" className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 bg-white px-1 transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-sm"> Address(#Home, Street, Subdivision) *</label>
                            </div>
                            <div className="relative w-[500px] mt-7">
                                <Select value={selected_region} onValueChange={(value) => setSelected_region(value)}>
                                    <SelectTrigger className={`w-[500px] border-gray-400 cursor-pointer`}>
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
                            <div className="relative w-[500px] mt-7">
                                <Select value={selected_provinces} onValueChange={(value) => setSelected_provinces(value)}>
                                    <SelectTrigger className={`w-[500px] border-gray-400 cursor-pointer`}>
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
                            <div className="relative w-[500px] mt-7">
                                <Select value={selected_cities} onValueChange={(value) => setSelected_cities(value)}>
                                    <SelectTrigger className={`w-[500px] border-gray-400 cursor-pointer`}>
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
                            <div className="relative w-[500px] mt-7">
                                <Select value={selected_barangay} onValueChange={(value) => setSelected_barangay(value)}>
                                    <SelectTrigger className={`w-[500px] border-gray-400 cursor-pointer`}>
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
                            <div className="mt-7 pb-5">
                                <p className="text-lg font-semibold">Payment method</p>
                                <label htmlFor="gcash" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition duration-500">
                                    <span className="flex items-center"><img src="/Logo/gcash.svg" alt="Gcash Logo" className="w-10 h-10 mr-3"/>Gcash</span> 
                                    <span><input type="radio" id="gcash" className="h-4 w-4 accent-blue-500" value="gcash" checked={selected_payment === "gcash"} onChange={() => setSelected_payment('gcash')}/></span>
                                </label>
                                <label htmlFor="maya" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md mt-3 cursor-pointer hover:bg-gray-200 transition duration-500">
                                    <span className="flex items-center"><img src="/Logo/maya.svg" alt="Gcash Logo" className="w-15 h-10 mr-3"/>Maya</span> 
                                    <span><input type="radio" id="maya" className="h-4 w-4 accent-blue-500"  value="maya" checked={selected_payment === "maya"} onChange={() => setSelected_payment('maya')}/></span>
                                </label>
                               <label htmlFor="card" className="flex items-center w-full justify-between py-5 px-5 border border-gray-300 rounded-md mt-3 cursor-pointer hover:bg-gray-200 transition duration-500">
                                    <span className="flex items-center"><Wallet size={20} className="mr-3"/> Debit/Credit Card</span> 
                                    <span><input type="radio" id="card" className="h-4 w-4 accent-blue-500"  value="card" checked={selected_payment === "card"} onChange={() => setSelected_payment('card')}/></span>
                                </label>
                            </div>
                            <button className="border border-black w-full mb-10 py-3 rounded-md bg-black text-white cursor-pointer hover:bg-black/70 transition">Place order</button>
                        </form>
                    </div>
                    <div className="lg:w-full py-5 px-2">
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
                        <div className="flex justify-between mb-2">
                            <span>Delivery/Shipping</span>
                            {shippingFee === 1 ? "Free" : shippingFee === 0 ? <span className="flex items-center text-sm text-gray-600 italic">Please fill up address first</span>  : <span className="flex items-center"><PhilippinePeso size={16} />{shippingFee}</span> }
                        </div>
                        <div className="flex justify-between font-semibold text-lg mt-4">
                            <span>Total</span>
                            <span className="flex items-center"><PhilippinePeso size={18} /> {totalPayment}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}