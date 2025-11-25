'use client'
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Verify_Account(){
    const {theme} = useTheme();
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [isTimerEnd, setIsTimerEnd] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
       setMounted(true);
        const interval = setInterval(() => {
            setTimer((prev) => prev -1);
        }, 1000)
        if(timer === 0){
            setIsTimerEnd(true);
        }
        return () => clearInterval(interval)
    },[timer]);
    if(!mounted){
        return null;
    }

    const backtoHome = () => {
        router.push("/");
    }

    const verifyAccount = () => {

    }
    return(
        <>
            {theme === 'dark' ? (<img src="/Logo/darkMode_logo.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>) : (<img src="/Logo/landing.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>)}
            <div className=" border h-screen flex items-center justify-center">
                <form className="shadow-2xl w-[95%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[30%] min-h-44 dark:bg-gray-800 rounded-md" onSubmit={verifyAccount}>
                    <h1 className="text-center font-bold text-2xl mt-2">Verify Account</h1>
                    <p className="text-center text-sm mt-2">We sent a verification code to your email: ivanpolicarpio015@gmail.com</p>
                    <div className="px-10 mt-2">
                       <input type="text" className="border border-black w-full h-9 rounded-md outline:border-blue-500 px-2 text-center" maxLength={6} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}/>
                    </div>
                    {isTimerEnd ? (<p className="text-center mt-2">Didn't receive code? <span className="text-blue-500 cursor-pointer">Resend</span></p>) : (<p className="text-center mt-2">{timer}s</p>)}
                    <div className="px-10 pb-5 mt-2">
                        <button className="border w-full p-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-500 transition duration-500">Create Account</button>
                    </div>
                </form>
            </div>
        </>
    );
}