
import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "./api/auth/[...nextauth]/Provider/Providers";
// In your component or _app.js
import 'react-phone-input-2/lib/style.css';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Poli Collective",
  description: "Clothing Store for Poli Collective",
  icons: {
    icon: "/Logo/Poli_Icon.png"
  }
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
            {children}
      </Providers>
      </body>
    </html>
  );
}
