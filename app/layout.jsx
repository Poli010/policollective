
import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Providers from "./api/auth/[...nextauth]/Provider/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Poli Collective",
  description: "Store of Poli Collective",
  icons: {
    icon: "/Logo/LOGO.png"
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
