'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Login_with_Google_btn from "./Login_with_Google_btn";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CircleAlert, Loader } from "lucide-react";

export default function Login({showLoginModal, setShowLoginModal, theme}){
    const [mounted, setMounted] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const [isNotRegistered, setIsNotRegistered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);
    // Prevent SSR mismatch
    if (!mounted) {
        return null;
    }

    const Login = (e) => {
        e.preventDefault();
        setIsClicked(true);
        setIsWrongPassword(false);
        setIsNotRegistered(false);
        axios.post('/api/auth/Login',{
            email: email,
            password: password
        }).then(response => {
            if(response.data.role === "admin"){
                router.push('/Admin_Page');
            }
            else if(response.data.role === "end_user"){
                sessionStorage.setItem("session2", true);
                location.reload();
            }
        }).catch(error => {
            if(error.response.status === 400){
                setIsClicked(false);
                setIsWrongPassword(true);
            }
            else if(error.response.status === 404){
                setIsNotRegistered(true);
                setIsClicked(false);
            }
            else if(error.response.status === 500){
                console.log(error.response.data.message);
                setIsClicked(false);
            }
        })
    }

    return(
        <>
            <div className={`fixed top-0 bg-black h-screen w-full z-21 opacity-50 ${showLoginModal ? 'scale-100' : 'scale-0'}`} onClick={() => setShowLoginModal(false)}></div>
            <div className={`fixed top-1/2 left-1/2 transform transition duration-500 -translate-x-1/2 -translate-y-1/2  shadow-2xl min-h[400px] w-[95%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[450px] py-5 rounded-md z-22 ${showLoginModal ? 'scale-100' : 'scale-0'} ${theme === "dark" ? 'bg-gray-800' : 'bg-white'}`}>
                <form className="px-10">
                    <h1 className="font-bold text-center text-xl">Login</h1>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="Email">Email:</label>
                        <input type="email" id="Email" className="border border-black dark:border-white h-9 rounded-md px-2 outline-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="flex flex-col mt-3">
                        <label htmlFor="Password">Password:</label>
                        <input type="password" id="Password" className="border border-black  dark:border-white h-9 rounded-md px-2 outline-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="mt-2">
                        {isWrongPassword && <p className="bg-red-500 text-white flex h-9 items-center rounded-md px-2"><CircleAlert/><span className="ml-1">Wrong Password!</span></p>}
                    </div>
                    <div className="mt-2">
                        {isNotRegistered && <p className="bg-red-500 text-white flex h-9 items-center rounded-md px-2"><CircleAlert/><span className="ml-1">Please sign up first before login.</span></p>}
                    </div>
                    <div className="text-end mt-3">
                        <Link href="/" className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}`}>Forgot Password?</Link>
                    </div>
                    <p className="text-center">or</p>
                    <div className="mt-3 flex items-center justify-center">
                        <Login_with_Google_btn theme={theme}/>
                    </div>
                    <div className="mt-3">
                        {isClicked ? (<button className="text-white bg-black w-full h-9 rounded-md opacity-80 flex justify-center items-center"><Loader className="animate-spin"/></button>) : (<button className="text-white bg-black w-full h-9 rounded-md cursor-pointer hover:bg-gray-700 duration-500" onClick={Login}>Login</button>)}
                        
                    </div>
                    <div className="mt-3 text-center">
                        <p>Don't have an account? <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}><Link href="/Sign_Up">Sign up</Link></span></p>
                    </div>
                    <div className="mt-3 hidden">
                        <p className="flex items-center bg-red-500 text-white h-9 rounded-md w-full">Error</p>
                    </div>
                </form>
            </div>
        </>
    );
}