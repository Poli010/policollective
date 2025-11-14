import "./globals.css";
import { Poppins } from "next/font/google";

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
    <html lang="en" className={poppins.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
