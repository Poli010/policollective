'use client'
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CircleAlert } from "lucide-react";

export default function Sign_Up(){
    const router = useRouter();
    const [showPassword, setShowPassword] = useState('password');
    const [isChecked, setIsChecked] = useState(false);
    const [isPasswordnotMatch, setIsPasswordnotMatch] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_Password] = useState('');
    const {theme} = useTheme();
    useEffect(() => {
        if(isChecked){
            setShowPassword('text');
        }
        else{
            setShowPassword('password');
        }
    }, [isChecked]);

    const backtoHome = () => {
        router.push('/')
    }

    const createAccount = (e) => {
        e.preventDefault();
        if(password !== confirm_password){
            setIsPasswordnotMatch(true);
        }
        else{
            setIsPasswordnotMatch(false);
        }
    }
    return(
        <>  
        {theme === 'dark' ? (<img src="/Logo/darkMode_logo.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>) : (<img src="/Logo/landing.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>)}
            <div className=" border h-screen flex items-center justify-center">
                <form className="shadow-2xl w-[500px] min-h-96 dark:bg-gray-800 rounded-md" onSubmit={createAccount}>
                    <h1 className="text-center font-bold text-2xl mt-2">Sign Up</h1>
                    <div className="px-20 py-3">
                        <div className="flex flex-col py-3">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label htmlFor="password">Password:</label>
                            <input type={showPassword} id="password" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex flex-col py-3">
                            <label htmlFor="confirm_pass">Confirm Password:</label>
                            <input type={showPassword} id="confirm_pass" className="border border-black rounded-md h-9 px-2 outline-blue-500 dark:border-white" value={confirm_password} onChange={(e) => setConfirm_Password(e.target.value)}/>
                        </div>
                        {isPasswordnotMatch && <p className="flex items-center bg-red-700 p-2 rounded-md text-white"><CircleAlert className="mr-1"/> Password does not match</p>}
                        <div className="flex flex-row items-center pt-1">
                            <Checkbox className="border-black cursor-pointer dark:border-white" id="showPassword" checked={isChecked} onCheckedChange={setIsChecked}/>
                            <label htmlFor="showPassword" className="ml-2">Show Password</label>
                        </div>
                        <div className="py-3">
                            <button className="border w-full p-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-500 transition duration-500">Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}