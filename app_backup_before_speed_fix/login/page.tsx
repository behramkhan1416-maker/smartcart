"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";

import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (rememberMe) {
        localStorage.setItem("rememberUser", "true");
      }

      toast.success("🎉 Login successful!");

      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;

        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;

        case "auth/invalid-credential":
          toast.error("Invalid email or password.");
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

        <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-xl border border-yellow-500/20">

          <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
            Login
          </h1>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white"
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-lg bg-black border border-gray-700 text-white pr-16"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-yellow-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>

              <Link
                href="/forgot-password"
                className="text-yellow-400 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>

          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-400 hover:underline"
            >
              Create one
            </Link>
          </p>

        </div>

      </main>
    </>
  );
}