"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import NewPasswordForm from "@/components/NewPasswordForm";

export default function NewEntryPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-blue-950">
            Add New Password
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Securely store a new password entry
          </p>
          <NewPasswordForm onEntryAdded={() => router.push("/dashboard")} />
        </div>
      </div>
    </div>
  );
}
