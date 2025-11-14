

import {signIn} from 'next-auth/react';
export default function Login_with_Google_btn({theme}){
  
    return(
        <>
            <button type='button' className={`flex items-center justify-center border border-black w-full rounded-md  hover:text-white transition duration-500 cursor-pointer  ${theme === 'dark' ? 'hover:bg-black' : 'hover:bg-gray-500'}`}
            onClick={() => signIn("google")}
            >
                Login with Google 
                <img src="/Logo/GoogleLogo.png" className='w-10'/>
            </button>
        </>
    );
}   