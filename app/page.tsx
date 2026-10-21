"use client";

import { useState, FormEvent } from "react";

export default function Home() {
  // Navigation View State: 'login' | 'dashboard'
  const [currentPage, setCurrentPage] = useState<"login" | "dashboard">("login");

  // Form Field States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validation Error State
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();

    // 1. Email check: Not empty and ends with @gmail.com
    if (!trimmedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    if (!trimmedEmail.toLowerCase().endsWith("@gmail.com")) {
      setErrorMessage("Email must end with @gmail.com");
      return;
    }

    // 2. Password check: Must be more than 6 characters
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }
    if (password.length <= 6) {
      setErrorMessage("Password must be more than 6 characters long.");
      return;
    }

    // Pass all checks -> Navigate to Dashboard
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    setCurrentPage("login");
  };

  return (
    <div className="w-full">
      {currentPage === "login" ? (
        /* LOGIN PAGE */
        <div className="max-w-md mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm">
              Sign in to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-12 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg shadow-indigo-600/30 active:scale-[0.99] cursor-pointer"
            >
              Sign In
            </button>

            {/* Bonus 1: Error Message Below Button */}
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                <span className="font-bold">!</span>
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      ) : (
        /* DASHBOARD PAGE */
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Bar */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
              <p className="text-slate-400 text-sm">
                Logged in as <span className="text-indigo-400 font-semibold">{email}</span>
              </p>
            </div>
            {/* Bonus 2: Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 font-medium px-5 py-2.5 rounded-lg transition duration-200 cursor-pointer text-sm"
            >
              Logout
            </button>
          </div>

          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Account Status
              </span>
              <div className="mt-2 text-2xl font-bold text-emerald-400">Active</div>
              <p className="text-xs text-slate-500 mt-1">Verified @gmail account</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Security Score
              </span>
              <div className="mt-2 text-2xl font-bold text-indigo-400">High</div>
              <p className="text-xs text-slate-500 mt-1">
                Password: {password.length} characters
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
              <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Current Session
              </span>
              <div className="mt-2 text-2xl font-bold text-amber-400">Online</div>
              <p className="text-xs text-slate-500 mt-1">Authenticated via Form</p>
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 text-sm">
                <span className="text-slate-300">User logged in via standard authentication</span>
                <span className="text-xs text-slate-500">Just now</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 text-sm">
                <span className="text-slate-300">Email format validated (@gmail.com)</span>
                <span className="text-xs text-slate-500">Just now</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700/50 text-sm">
                <span className="text-slate-300">Password length check passed (&gt;6 characters)</span>
                <span className="text-xs text-slate-500">Just now</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}