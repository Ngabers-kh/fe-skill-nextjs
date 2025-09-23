"use client";
import { useState } from "react";
import clsx from "clsx";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    job: "",
  });

  // Handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fetch login API
  };
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fetch register API
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <div className="w-full mx-4 my-4 max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl relative h-[600px]">
        {/* SLIDER CONTAINER */}
        <div
          className={clsx(
            "flex w-[200%] h-full transition-transform duration-700",
            isLogin ? "translate-x-[-50%]" : "translate-x-0"
          )}
        >
          {/* SIGN UP (LEFT) */}
          <div className="w-1/2 flex flex-col md:flex-row">
            {/* LEFT: FORM */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-10 py-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Sign Up
              </h2>
              <form className="space-y-4 w-full" onSubmit={handleRegisterSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={registerForm.address}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="job"
                  placeholder="Job"
                  value={registerForm.job}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-[#FFEEAA] hover:bg-yellow-400 text-gray-900 font-medium shadow-md"
                >
                  Sign Up →
                </button>
              </form>
              <p className="text-sm text-gray-700 mt-6">
                Already have an account?{" "}
                <button
                  className="text-gray-900 font-medium underline hover:text-blue-600"
                  onClick={() => setIsLogin(true)}
                  type="button"
                >
                  Log In →
                </button>
              </p>
            </div>
            {/* RIGHT: IMAGE */}
            <div
               className="w-full md:w-1/2 flex items-center justify-center bg-cover bg-center h-40 md:h-auto"
                style={{ backgroundImage: "url('/bg-right-register.png')" }}
            >
              <div className="text-center text-white space-y-4 px-6">
      <h2 className="text-2xl md:text-3xl font-bold">Join Us!</h2>
      <p className="text-gray-200">Sign up and start your journey!</p>
    </div>
            </div>
          </div>

          {/* LOGIN (RIGHT) */}
          <div className="w-1/2 flex">
            {/* LEFT: IMAGE */}
            <div
              className="w-1/2 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/bg-right-register.png')" }}
            >
              <div className="text-center text-white space-y-4 px-6">
                <h2 className="text-3xl font-bold">Welcome Back!</h2>
                <p className="text-gray-200">
                  Login to access your account and projects.
                </p>
              </div>
            </div>
            {/* RIGHT: FORM */}
            <div className="w-1/2 flex flex-col justify-center items-center px-10">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Log In
              </h2>
              <form className="space-y-4 w-full" onSubmit={handleLoginSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-[#FFEEAA] hover:bg-yellow-400 text-gray-900 font-medium shadow-md"
                >
                  Log In →
                </button>
              </form>
              <p className="text-sm text-gray-700 mt-6">
                Don&apos;t have an account?{" "}
                <button
                  className="text-gray-900 font-medium underline hover:text-blue-600"
                  onClick={() => setIsLogin(false)}
                  type="button"
                >
                  Sign Up →
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
