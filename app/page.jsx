'use client'
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import All_Products from "./Home_Page/All_Products/page";
import Footer from "./Home_Page/Footer/page";
import About_Us from "./Home_Page/About_Us/page";

export default function Index(){
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {theme} = useTheme();
  const [isOpen, setIsOpen] = useState(false);
     const [mounted, setMounted] = useState(false);
     useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
  return(
    <>
      <div className="h-auto max-w-400 mx-auto">
        <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className={`relative overflow-hidden bg-linear-to-tr from-[#dda9fd] via-[#b3f0ff] to-[#aa82ee] dark:from-[#0f172a] dark:via-[#020617] dark:to-[#020617] ${isOpen ? "h-[90vh] overflow-hidden" : ""}`}>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/0 dark:bg-black/40 pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
              {/* TEXT */}
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <span className="inline-block text-xs sm:text-sm tracking-widest uppercase font-semibold text-gray-700 dark:text-gray-400">Faith • Street • Lifestyle</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-black dark:text-white">Wear With A Purpose</h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto lg:mx-0">Poli Collective blends faith, streetwear, lifestyle and minimalist design to create bold everyday essentials.</p>
                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link href="/Shop_Now" className="w-full sm:w-auto px-8 py-3 rounded-md transition duration-300 hover:scale-[1.03] bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">Shop Now</Link>
                  <Link href="#about_us" className="w-full sm:w-auto px-8 py-3 rounded-md transition duration-300 hover:scale-[1.03] border border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">Learn More</Link>
                </div>
                {/* Trust line */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">✔ Premium Quality • ✔ Everyday Wear • ✔ Faith-Inspired</p>
              </div>

              {/* IMAGE */}
              <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
                <img src="/model/home_model_transparent.png" alt="Poli Collective Model" className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-lg object-contain drop-shadow-2xl dark:brightness-110 dark:contrast-110"/>
              </div>
            </div>
          </div>
          <div>
            <All_Products/>
          </div>
          <div>
            <About_Us/>
          </div>
          <div>
            <Footer/>
          </div>
      </div>
      <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
    </>
  );
}