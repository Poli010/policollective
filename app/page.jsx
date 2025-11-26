'use client'
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Index(){
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {theme} = useTheme();
  return(
    <>
      <div className="h-screen max-w-400 mx-auto">
        <SideBar setShowLoginModal={setShowLoginModal}/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 place-items-center justify-center p-3 lg:p-10 xl:px-30 ">
          <img src="/model/home_model_transparent.png" className="w-[90%]"/>
          <div className="mt-3 max-w-[1000px]">
            <h1 className="font-bold text-[25pt]">Poli Collective</h1>
            <p className="text-justify text-[12pt] mt-2 ">"Poli Collective is a lifestyle brand that blends faith, style, and urban energy. We create clothing that inspires confidence and self-expression through Christian wear, streetwear, minimalist designs, and sports-inspired apparel. Our mission is to empower individuals to wear their beliefs and passions proudly, while staying bold, comfortable, and effortlessly stylish in every aspect of life."</p>
              <Link href="/Shop_Now" className="flex items-center justify-center mt-2 bg-black text-white w-full h-10 rounded-md hover:bg-gray-700 cursor-pointer transition duration-500">Shop Now</Link>
          </div>
        </div>
      </div>
      <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme}/>
    </>
  );
}