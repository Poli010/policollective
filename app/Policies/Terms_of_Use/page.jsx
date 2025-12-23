'use client'
import Footer from "@/app/Home_Page/Footer/page";
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Terms_of_Use(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const {theme} = useTheme();
     useEffect(() => {
        document.title = "Terms of use - Poli Collective"
    }, []);
    return(
        <>
             <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen} cartCount={cartCount} setCartCount={setCartCount}/>
                <div className="py-30 px-3 lg:px-10 xl:px-20">
                    <h1 className="text-center font-bold text-2xl">Terms of use</h1>
                    <p className="text-sm text-justify  px-96 py-3 pb-10">Welcome to Poli Collective. By accessing or using this website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you should not use this website or its services</p>
                    <h1 className="px-96 font-bold text-lg">Eligibility</h1>
                    <p className="text-sm text-justify  px-96 pb-10">To use this website and make purchases, you must be at least eighteen (18) years old or have the consent of a parent or legal guardian. By using this website, you represent and warrant that you meet this eligibility requirement.</p>
                    <h1 className="px-96 font-bold text-lg">Account Responsibilities</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Users are responsible for maintaining the confidentiality of their account information, including passwords, and for all activities conducted under their account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that are suspected of misuse, fraud, or violation of these terms.</p>
                    <h1 className="px-96 font-bold text-lg">Products & Orders</h1>
                    <p className="text-sm text-justify  px-96 pb-10">We strive to ensure that all product descriptions, images, and prices are accurate; however, errors may occasionally occur. Prices and availability are subject to change without prior notice. We reserve the right to cancel orders, limit quantities, or refuse service at our discretion, including in cases of pricing errors or suspected fraudulent activity.</p>
                    <h1 className="px-96 font-bold text-lg">Payments</h1>
                    <p className="text-sm text-justify  px-96 pb-10">We accept payment methods such as GCash, Cash on Delivery (COD), and other available payment options displayed on the website. All payments must be completed and verified before orders are processed and shipped, except for COD transactions where applicable. Failed or incomplete payments may result in order cancellation.</p>
                    <h1 className="px-96 font-bold text-lg">Shipping & Delivery</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Estimated delivery time provided on the website are for reference only and are not guaranteed. Shipping delays may occur due to courier issues, weather conditions, or other circumstances beyond our control. We are not responsible for delays caused by third-party delivery services or force majeure events.</p>
                    <h1 className="px-96 font-bold text-lg">Returns & Refunds</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Returns and refunds are only accepted for products that are defective or damaged upon delivery and must be requested within seven (7) days from receipt of the item. Items must be returned in their original condition and packaging. Please note that returns or refunds will not be accepted for wrong sizing, color preferences, or change of mind, and we reserve the right to refuse any return or refund requests that do not meet these conditions.</p>
                    <h1 className="px-96 font-bold text-lg">Intellectual Property</h1>
                    <p className="text-sm text-justify  px-96 pb-10">All content on this website, including our own logos, designs, text, images, and graphics, is the intellectual property of Poli Collective and is protected by applicable laws. Logos and trademarks of third-party companies, such as GCash, Maya, J&T, SPX express and other payment providers, are the property of their respective owners and are used with permission. Unauthorized reproduction, distribution, or use of any content without prior written permission is strictly prohibited.</p>
                    <h1 className="px-96 font-bold text-lg">Prohibited Use</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Users may not use this website for unlawful purposes, attempt to gain unauthorized access to systems, scrape or collect data, upload malicious software, or engage in any activity that may damage, disrupt, or interfere with the website’s operation or security.</p>
                    <h1 className="px-96 font-bold text-lg">Limitation of Liability</h1>
                    <p className="text-sm text-justify  px-96 pb-10">To the fullest extent permitted by law, Poli Collective shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use this website, including losses resulting from misuse, technical issues, or third-party actions.</p>
                    <h1 className="px-96 font-bold text-lg">Changes to Terms</h1>
                    <p className="text-sm text-justify  px-96 pb-10">We reserve the right to modify or update these Terms of Use at any time without prior notice. Any changes will take effect immediately upon posting on the website, and continued use of the site constitutes acceptance of the updated terms.</p>
                    <h1 className="px-96 font-bold text-lg">Governing Law</h1>
                    <p className="text-sm text-justify  px-96 pb-10">These Terms of Use shall be governed by and interpreted in accordance with the laws of the Republic of the Philippines, without regard to conflict of law principles.</p>
                </div>
                <Footer/>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
        </>
    );
}