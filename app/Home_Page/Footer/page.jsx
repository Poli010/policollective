import { Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
export default function Footer(){
    return (
        <>
            <footer id="footer" className="border border-black bg-gray-900 px-5 py-10 ">
                <img src="/Logo/darkMode_logo.png" alt="company logo" className="w-[100px]" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-96 ">
                    <div className="text-white text-sm ">
                        <h3 className="text-white font-bold">Contact us:</h3>
                        <a href="tel:+639485905921" className="hover:text-blue-500 transition flex items-center md:pl-5 pb-2 mt-2"><Phone size={18}/><span className="ml-1">+639-48-590-5921</span></a>
                        <a href="mailto:policollective@mgail.com" className="hover:text-blue-500 transition flex items-center md:pl-5"><Mail size={18}/><span className="ml-1">policollective@gmail.com</span></a>
                    </div>
                    <div className="text-white text-sm  ">
                        <h3 className="text-white font-bold">Follow us:</h3>
                        <a href="https://www.facebook.com/profile.php?id=61579225901020" target="_blank" className="hover:text-blue-500 transition flex items-center md:pl-5 pb-2 mt-2"><FaFacebook size={18}/><span className="ml-1">Poli Collective</span></a>
                        <a href="https://www.instagram.com/policollective" target="_blank" className="hover:text-blue-500 transition flex items-center md:pl-5 pb-2"><FaInstagram size={18}/><span className="ml-1">Poli Collective</span></a>
                        <a href="https://www.tiktok.com/@policollective" target="_blank"  className="hover:text-blue-500 transition flex items-center md:pl-5"><FaTiktok size={18}/> <span className="ml-1">Poli Collective</span></a>
                    </div>
                    <div className="text-white text-sm flex flex-col ">
                        <a href="/Policies/Terms_of_Use" className="hover:text-blue-500 transition pb-2">Terms of Use</a>
                        <a href="/Policies/Privacy_Policy" className="hover:text-blue-500 transition">Privacy Policy</a>
                    </div>
                </div>
                <div className="mt-10 text-center text-xs text-gray-400">© 2025 Poli Collective. All rights reserved.</div>
            </footer>
        </>
    );
}