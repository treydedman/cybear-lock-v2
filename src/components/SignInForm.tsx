"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "./useUser";
import { User } from "./UserContext";

type AuthData = {
  user: User;
  token: string;
};

export function SignInForm() {
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error(`fetch Error ${res.status}`);
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

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
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-950">
          Sign In
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Welcome back! Please sign in.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-6">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          <p className="text-center text-medium text-gray-500 leading-none">
            or
          </p>
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition disabled:bg-gray-400"
            onClick={handleGuestSignIn}
            disabled={isLoading}
          >
            Continue as Guest
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/auth?mode=sign-up"
            className="relative font-bold text-blue-950 hover:underline before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-blue-950 before:transition-all before:duration-500 hover:before:w-full"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
