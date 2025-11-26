"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkMode({theme, setTheme}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR mismatch
  if (!mounted) {
    return null;
  }

  return (
    <button
      className="p-2 border rounded-md cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-500"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Moon/> : <Sun />}
    </button>
  );
}
