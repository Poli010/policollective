import { useRouter } from "next/navigation";
export default function Success_Modal({isCreated}){
    const router = useRouter();
    const backToHome = () => {
        localStorage.removeItem('email');
        router.push('/');
    }
    return(
        <>
            <div className={`fixed top-1/2 left-1/2 transform -translate-1/2 bg-white dark:bg-gray-800 h-72 w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[500px] shadow-2xl rounded-md transition duration-500 ${isCreated ? 'scale-100' : 'scale-0'}`}>
                <h1 className="font-bold text text-center text-2xl mt-5">Congrats!</h1>
                <div className=" flex justify-center">
                    <img src="/Success/Confetti.png" className="w-42 text-center" />
                </div>
                <p className="text-center">Your account is created!</p>
                <div className="px-5 mt-3">
                    <button className="bg-black text-white w-full h-9 cursor-pointer hover:bg-gray-500 transition duration-500 rounded-md" onClick={backToHome}>Confirm</button>
                </div>
            </div>
        </>
    );
}