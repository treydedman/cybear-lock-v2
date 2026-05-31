"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  return (
    <header className="w-full bg-gray-700 px-6 py-4 flex items-center justify-between">
      <Link href="/dashboard" className="flex items-center">
        <Image src="/cybear-lock.svg" alt="Logo" width={64} height={64} />
      </Link>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="text-gray-300 hover:text-teal-500 transition"
      >
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </header>
  );
}
