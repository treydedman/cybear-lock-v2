"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/components/useUser";

export default function Home() {
  const router = useRouter();
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGuestSignIn() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: "Guest",
          password: "guestPass123$",
        }),
      });

      if (!res.ok) throw new Error("Guest sign-in failed");

      const { user, token } = await res.json();
      handleSignIn(user, token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(`Error signing in as guest: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      {/* Nav */}
      <header className="w-full bg-gray-700 px-6 py-4 flex items-center justify-between">
        <Image
          src="/cybear-lock.svg"
          alt="CyBear Lock Logo"
          width={120}
          height={120}
          className="h-12 w-auto"
        />
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/auth")}
            className="px-4 py-2 text-sm text-white bg-transparent border border-white rounded-lg hover:bg-white hover:text-gray-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth?mode=sign-up")}
            className="px-4 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-400 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          CyBear Lock
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
          The Secure Way to Forget Your Passwords
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-10">
          Store and manage your login credentials securely with AES encryption.
          Clean, fast, and simple — so you can remember the important stuff.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push("/auth?mode=sign-up")}
            className="px-6 py-3 text-white bg-blue-950 rounded-lg hover:bg-teal-500 transition font-medium"
          >
            Create an Account
          </button>
          <button
            onClick={handleGuestSignIn}
            disabled={isLoading}
            className="px-6 py-3 text-blue-950 dark:text-white border border-blue-950 dark:border-white rounded-lg hover:bg-blue-950 hover:text-white transition font-medium disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Try as Guest"}
          </button>
        </div>
      </main>

      {/* Features */}
      <section className="bg-white dark:bg-gray-700 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              AES Encrypted
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Every password is encrypted before it ever touches the database.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🧑‍💻</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Guest Access
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Try the full experience instantly — no account required.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">📱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Mobile Friendly
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Designed to work beautifully on any device, any screen size.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-700 text-center text-gray-400 text-sm py-4">
        © {new Date().getFullYear()} CyBear Lock · Built by Trey Dedman
      </footer>
    </div>
  );
}
