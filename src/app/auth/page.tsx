"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SignInForm } from "@/components/SignInForm";
import { RegistrationForm } from "@/components/RegistrationForm";

function AuthContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <div className="container m-4">
      {mode === "sign-up" ? <RegistrationForm /> : <SignInForm />}
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthContent />
    </Suspense>
  );
}
