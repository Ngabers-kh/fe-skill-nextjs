"use client";
import { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { registerUser, loginUser } from "./../services/api";
import Cookies from "js-cookie";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    job: "",
  });

  const router = useRouter();

  // Handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  // LOGIN
    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await loginUser(loginForm.email, loginForm.password);

        if (res.token) {
          Cookies.set("token", res.token, { expires: 1 }); // 7 hari
          Cookies.set("userId", res.userId, { expires: 1 }); 
        }

        router.push("/skill");
      } catch (err: any) {
        setErrorMsg(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    };


  // REGISTER
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await registerUser(registerForm);
      console.log("Register success:", res);

      if (res.token) {
          Cookies.set("token", res.token, { expires: 1 }); // 7 hari
          Cookies.set("userId", res.userId, { expires: 1 }); 
      }

      router.push("/skill");
    } catch (err: any) {
      setErrorMsg(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-2 sm:p-4"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      {/* Mobile/Tablet View (< lg) */}
      <div className="lg:hidden w-full max-w-sm sm:max-w-md">
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl mx-5">
          {isLogin ? (
            // Mobile Login
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center">
                Log In
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <button
                  onClick={handleLoginSubmit}
                  className="w-full py-3 rounded-full bg-yellow-200 hover:bg-yellow-400 text-gray-900 font-medium shadow-md transition-colors"
                >
                  Log In →
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-6 text-center">
                Don't have an account?{" "}
                <button
                  className="text-gray-900 font-medium underline hover:text-blue-600"
                  onClick={() => setIsLogin(false)}
                  type="button"
                >
                  Sign Up →
                </button>
              </p>
            </div>
          ) : (
            // Mobile Register
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center">
                Sign Up
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={registerForm.address}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <input
                  type="text"
                  name="job"
                  placeholder="Job"
                  value={registerForm.job}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-3 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <button
                  onClick={handleRegisterSubmit}
                  className="w-full py-3 rounded-full bg-yellow-200 hover:bg-yellow-400 text-gray-900 font-medium shadow-md transition-colors"
                >
                  Sign Up →
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-6 text-center">
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
          )}
        </div>
      </div>

      {/* Desktop View (>= lg) - Original Design */}
      <div className="hidden lg:block w-full mx-4 my-4 max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl relative h-[600px]">
        {/* SLIDER CONTAINER */}
        <div
          className={`flex w-[200%] h-full transition-transform duration-700 ${
            isLogin ? "translate-x-[-50%]" : "translate-x-0"
          }`}
        >
          {/* SIGN UP (LEFT) */}
          <div className="w-1/2 flex flex-col md:flex-row">
            {/* LEFT: FORM */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-10 py-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Sign Up
              </h2>
              <div className="space-y-4 w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={registerForm.address}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <input
                  type="text"
                  name="job"
                  placeholder="Job"
                  value={registerForm.job}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <button
                  onClick={handleRegisterSubmit}
                  className="w-full py-2 rounded-full bg-yellow-200 hover:bg-yellow-400 text-gray-900 font-medium shadow-md"
                >
                  Sign Up →
                </button>
              </div>
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
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-yellow-200 hover:bg-yellow-400 text-gray-900 font-medium shadow-md"
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
