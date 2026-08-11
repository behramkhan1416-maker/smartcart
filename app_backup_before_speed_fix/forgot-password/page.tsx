"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { auth } from "../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword() {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, email);

      toast.success("Password reset email sent!");

      setEmail("");

    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;

        default:
          toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black flex items-center justify-center px-6">

        <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-yellow-500/20 shadow-xl">

          <h1 className="text-4xl font-bold text-yellow-400 text-center mb-3">
            Forgot Password
          </h1>

          <p className="text-center text-gray-400 mb-8">
            Enter your email and we'll send you a password reset link.
          </p>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>

          </div>

          <div className="text-center mt-8">

            <Link
              href="/login"
              className="text-yellow-400 hover:underline"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </main>
    </>
  );
}