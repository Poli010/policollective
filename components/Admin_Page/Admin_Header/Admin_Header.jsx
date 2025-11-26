import { Bell, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin_Header(){
    const router = useRouter();
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        const whatIsEmail = localStorage.getItem("email");
        axios.get('/api/admin_page/dashboard',{
            params: {email: whatIsEmail}
        }).then(response => {
            if(response.status === 200){
                setUser(response.data.result)
            }
        }).catch(error => {
            if(error.response.status === 404 || error.response.status === 500){
                router.push("/");
            }
        })
    }, []);
    
    return(
        <>
            <div className="flex justify-between">
                <div>
                    <p className="text-gray-500 text-[12pt]">Welcome back, {user.fullname} 👋</p>
                    <h1 className="font-semibold text-5xl mt-1">Dashboard</h1>
                </div>
                <div className="flex h-9 items-center">
                    <div>
                        <div className="absolute ml-3 -mt-3 bg-red-500 text-white rounded-full w-5 h-5 text-center">1</div>
                        <Bell/>
                    </div>
                    <div className="p-2 border rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-500 ml-3">
                        <User />
                    </div>
                </div>
            </div>
        </>
    );
}