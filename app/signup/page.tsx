"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../lib/firebase";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("🎉 Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1200);

    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email is already registered.");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;

        case "auth/weak-password":
          toast.error("Password is too weak.");
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

        <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl border border-yellow-500/20">

          <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
            Create Account
          </h1>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
            />

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </div>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-yellow-400 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </main>
    </>
  );
}