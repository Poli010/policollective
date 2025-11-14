'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Login_with_Google_btn from "./Login_with_Google_btn";
export default function Login({showLoginModal, setShowLoginModal, theme}){
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        }, []);
        // Prevent SSR mismatch
        if (!mounted) {
        return null;
        }
    return(
        <>
            <div className={`fixed top-0 bg-black h-screen w-full z-21 opacity-50 ${showLoginModal ? 'scale-100' : 'scale-0'}`} onClick={() => setShowLoginModal(false)}></div>
            <div className={`fixed top-1/2 left-1/2 transform transition duration-500 -translate-x-1/2 -translate-y-1/2  shadow-2xl min-h[400px] w-[95%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[28%] py-5 rounded-md z-22 ${showLoginModal ? 'scale-100' : 'scale-0'} ${theme === "dark" ? 'bg-gray-500' : 'bg-white'}`}>
                <form className="px-10">
                    <h1 className="font-bold text-center text-xl">Login</h1>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="Email">Email:</label>
                        <input type="email" id="Email" className="border h-9 rounded-md" required/>
                    </div>
                    <div className="flex flex-col mt-3">
                        <label htmlFor="Password">Password:</label>
                        <input type="password" id="Password" className="border h-9 rounded-md" required/>
                    </div>
                    <div className="text-end mt-3">
                        <Link href="/" className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}`}>Forgot Password?</Link>
                    </div>
                    <p className="text-center">or</p>
                    <div className="mt-3 flex items-center justify-center">
                        <Login_with_Google_btn theme={theme}/>
                    </div>
                    <div className="mt-3">
                        <button className="text-white bg-black w-full h-9 rounded-md cursor-pointer hover:bg-gray-700 duration-500">Login</button>
                    </div>
                    <div className="mt-3 text-center">
                        <p>Don't have an account? <span className={theme === 'dark' ? 'text-blue-300' : 'text-blue-500'}><Link href="/SignUp">Sign up</Link></span></p>
                    </div>
                    <div className="mt-3 hidden">
                        <p className="flex items-center bg-red-500 text-white h-9 rounded-md w-full">Error</p>
                    </div>
                </form>
            </div>
        </>
    );
}