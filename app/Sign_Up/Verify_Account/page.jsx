'use client'
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CircleAlert, Loader } from "lucide-react";
import axios from "axios";
import Success_Modal from "@/components/Modal/Success_Create_Account/Success_Modal";

export default function Verify_Account(){
    const {theme} = useTheme();
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [isTimerEnd, setIsTimerEnd] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isWrongVerificationCode, setIswrongVerificaionCode] = useState(false);
    const [email, setEmail] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        setMounted(true);
        const emailLocal = localStorage.getItem("email");
        const interval = setInterval(() => {
            setTimer((prev) => prev -1);
        }, 1000)
        if(timer === 0){
            setIsTimerEnd(true);
        }
        if(emailLocal){
            setEmail(emailLocal);
        }
        else{
            router.push('/')
        }
        return () => clearInterval(interval)
    },[timer, email]);
    if(!mounted){
        return null;
    }

    const backtoHome = () => {
        router.push("/");
    }

    const verifyAccount = (e) => {
        e.preventDefault();
        setIsClicked(true);
        setIswrongVerificaionCode(false);
        axios.post('/api/auth/Sign_Up/Verify_Account',{
            email: email,
            verificationCode: verificationCode
        }).then(response => {
            if(response.status === 200){
                setIsCreated(true);
                setIsClicked(false);
            }
        }).catch(error => {
            if(error.response.status === 400){
                console.log(error.response.data.message);
                setIswrongVerificaionCode(true);
                setIsClicked(false);
            }
            else if(error.response.status === 404 || error.response.status === 500){
                console.log(error.response.data.message);
            }
        })
    }

    const ResendCode = () => {
        setIsTimerEnd(false);
        setTimer(120);
        axios.post('/api/auth/Resend_Code',{
            email: email
        }).then(response => {
            if(response.status === 200){
                console.log(response.data.message);
            }
        }).catch(error => {
            if(error.response.status === 400 || error.response.status === 500){
                console.log(error.response.data.message);
            }
        });
    }
    return(
        <>
            {theme === 'dark' ? (<img src="/Logo/darkMode_logo.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>) : (<img src="/Logo/landing.png" className="w-[100px] cursor-pointer fixed ml-5" onClick={backtoHome}/>)}
            <div className={`border h-screen flex items-center justify-center ${isCreated ? 'bg-black opacity-80 border-black' : ''}`}>
                <form className="shadow-2xl w-[95%] sm:w-[70%] md:w-[60%] lg:w-[45%] xl:w-[450px] min-h-44 dark:bg-gray-800 rounded-md" onSubmit={verifyAccount}>
                    <h1 className="text-center font-bold text-2xl mt-2">Verify Account</h1>
                    <p className="text-center text-sm mt-2">We sent a verification code to your email: {email}</p>
                    <div className="px-10 mt-2">
                       <input type="text" className="border border-black w-full h-9 rounded-md outline-blue-500 px-2 text-center dark:border-white" maxLength={6} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))} autoComplete="off" required/>
                    </div>
                    <div className="px-10 mt-2">
                        {isWrongVerificationCode && <p className="flex h-9 items-center bg-red-500 text-white rounded-md px-3"><CircleAlert/>Verifcation code not match!</p>}
                    </div>
                   
                    {isTimerEnd ? (<p className="text-center mt-2 ">Didn't receive code? <span className="text-blue-500 cursor-pointer" onClick={ResendCode}>Resend</span></p>) : (<p className="text-center mt-2">{timer}s</p>)}
                    <div className="px-10 pb-5 mt-2">
                        {isClicked ? (<button className="border w-full p-2 bg-black text-white rounded-md opacity-80 flex justify-center"><Loader className="animate-spin"/></button>) : (<button className="border w-full p-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-500 transition duration-500">Create Account</button>)}
                        
                    </div>
                </form>
            </div>
            <Success_Modal isCreated={isCreated}/>
        </>
    );
}