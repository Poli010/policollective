'use client'
import Footer from "@/app/Home_Page/Footer/page";
import Login from "@/components/Modal/Login_Modal/Login";
import SideBar from "@/components/SideBar/SideBar";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Privacy_Policy(){
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const {theme} = useTheme();

    return(
        <>
             <div className="h-auto max-w-400 mx-auto">
                <SideBar setShowLoginModal={setShowLoginModal} isOpen={isOpen} setIsOpen={setIsOpen} cartCount={cartCount} setCartCount={setCartCount}/>
                <div className="py-30 px-3 lg:px-10 xl:px-20">
                    <h1 className="text-center font-bold text-2xl pb-10">Privacy Policy</h1>
                    <h1 className="px-96 font-bold text-lg">Information We Collect</h1>
                    <p className="text-sm text-justify  px-96 py-3 pb-10">We collect personal information that you voluntarily provide when using our website, creating an account, or placing an order. This includes your name, email address, phone number, shipping address, and payment information (such as details for GCash, Maya, or debit card transactions). We may also collect technical data such as IP addresses, browser type, and device information to help improve website functionality and security.</p>
                    <h1 className="px-96 font-bold text-lg">How We Use Your Information</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Your information is used solely to process and fulfill your orders, deliver products, provide customer support, and improve your shopping experience. We may use your email to send order updates, confirmations, or important announcements. We do not share your personal information for marketing purposes without your consent.</p>
                    <h1 className="px-96 font-bold text-lg">Sharing of Information</h1>
                    <p className="text-sm text-justify  px-96 pb-10">We may share your information with trusted third parties, including: Payment providers (GCash, Maya, debit card processors) to process transactions. Delivery or courier services to fulfill your orders. Legal authorities, if required by law or to protect our rights. We do not sell, rent, or trade your personal information to any third parties.</p>
                    <h1 className="px-96 font-bold text-lg">Cookies and Tracking</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Our website uses cookies and similar tracking technologies to enhance your experience, remember preferences, analyze website performance, and improve functionality. You may choose to disable cookies in your browser settings, but some features may not work properly if cookies are disabled.</p>
                    <h1 className="px-96 font-bold text-lg">Security of Your Information</h1>
                    <p className="text-sm text-justify  px-96 pb-10">We take reasonable measures to protect your personal data, including encrypted payment processing, secure server storage, and restricted access to sensitive information. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.</p>
                    <h1 className="px-96 font-bold text-lg">Retention of Data</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Your personal data is retained only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
                    <h1 className="px-96 font-bold text-lg">User Rights</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Under the Data Privacy Act of 2012 (RA 10173), you have the right to: 1.Request access to your personal data. 1.Request correction or updating of your information. 3.Request deletion or removal of your data. To exercise any of these rights, please contact us at <a href="mailto:policollective@gmail.com" target="_blank" className="text-blue-500">policollective@gmail.com</a>.</p>
                    <h1 className="px-96 font-bold text-lg">Third-Party Links</h1>
                    <p className="text-sm text-justify  px-96 pb-10">Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read their privacy policies before providing any personal information.</p>
                    <h1 className="px-96 font-bold text-lg">Changes to This Privacy Policy</h1>
                    <p className="text-sm text-justify  px-96 pb-10">We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of our website constitutes acceptance of the updated policy.</p>
                    <h1 className="px-96 font-bold text-lg">Contact Information</h1>
                    <p className="text-sm text-justify  px-96 pb-10">If you have questions about this Privacy Policy or how we handle your personal data, please contact us at: Email: <a href="mailto:policollective" target="_blank" className="text-blue-500">policollective@gmail.com</a></p>
                </div>
                <Footer/>
            </div>
            <Login showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} theme={theme} />
        </>
    );
}