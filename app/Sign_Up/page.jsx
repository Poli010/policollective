'use client'
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CircleAlert, Loader } from "lucide-react";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';


export default function Sign_Up(){
    const router = useRouter();
    const [showPassword, setShowPassword] = useState('password');
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordnotMatch, setIsPasswordnotMatch] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_Password] = useState('');
    const {theme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        setMounted(true);
        if(isChecked){
            setShowPassword('text');
        }
        else{
            setShowPassword('password');
        }
    }, [isChecked]);
    if(!mounted){
        return null;
    }

    const backtoHome = () => {
        router.push('/')
    }

    const createAccount = (e) => {
        e.preventDefault();
        setIsClicked(true);
        if(password !== confirm_password){
            setIsPasswordnotMatch(true);
            setIsClicked(false);
        }
        else{
            axios.post('api/auth/Sign_Up',{
                fullname: fullname,
                email: email,
                phoneNumber: phoneNumber,
                password: password
            }).then(response => {
                if(response.status === 200){
                    localStorage.setItem("email", email);
                    router.push("/Sign_Up/Verify_Account")
                }
            }).catch(error => {
                if(error.response.status === 500){
                    console.log(error.response.data.message);
                    setIsClicked(false);
                }
            })
        }
    }
    return(
        <>  
        {theme === 'dark' ? (<img src="/Logo/darkMode_logo.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>) : (<img src="/Logo/landing.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>)}
            <div className=" border h-screen flex items-center justify-center">
                <form className="shadow-2xl w-[95%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[450px] min-h-96 dark:bg-gray-800 rounded-md" onSubmit={createAccount}>
                    <h1 className="text-center font-bold text-2xl mt-2">Sign Up</h1>
                    <div className="px-6 md:px-10 py-3">
                        <div className="flex flex-col py-3">
                            <label htmlFor="fullname">Full Name:</label>
                            <input type="text" id="fullname" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={fullname} onChange={(e) => setFullname(e.target.value)} required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label htmlFor="contact_number">Mobile Number:</label>
                            <label htmlFor="contact_number" className="border border-black rounded-md flex items-center h-9  outline-blue-500 dark:border-white">
                            <PhoneInput
                                country={'ph'} // default country
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                inputProps={{
                                name: 'phone',
                                required: true,
                                id: 'contact_number',
                                }}
                                containerClass=""
                                inputClass="!border-none !bg-transparent"
                                buttonClass="!border-r-black !rounded-l-md !bg-transparent !hover:bg-none dark:!border-r-white"
                                dropdownClass="!rounded-md !border !border-black dark:!border-white dark:!bg-gray-900"
                            />
                            </label>

                        </div>
                        <div className="flex flex-col py-3">
                            <label htmlFor="password">Password:</label>
                            <input type={showPassword} id="password" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label htmlFor="confirm_pass">Confirm Password:</label>
                            <input type={showPassword} id="confirm_pass" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={confirm_password} onChange={(e) => setConfirm_Password(e.target.value)} required/>
                        </div>
                        {isPasswordnotMatch && <p className="flex items-center bg-red-700 p-2 rounded-md text-white"><CircleAlert className="mr-1"/> Password does not match</p>}
                        <div className="flex flex-row items-center pt-1">
                            <Checkbox className="border-black cursor-pointer dark:border-white" id="showPassword" checked={isChecked} onCheckedChange={setIsChecked}/>
                            <label htmlFor="showPassword" className="ml-2">Show Password</label>
                        </div>
                        <div className="py-3">
                            {isClicked ? (<button className="border w-full p-2 bg-black opacity-90 text-white rounded-md flex justify-center" disabled><Loader className="animate-spin"/></button>) : ( <button className="border w-full p-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-500 transition duration-500">Create Account</button>)}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}