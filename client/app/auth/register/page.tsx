import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <RegisterForm />
    </div>
  );
}
