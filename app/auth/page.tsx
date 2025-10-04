"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, X } from "lucide-react";
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

  // Clear error when switching forms
  const switchForm = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setErrorMsg("");
  };

  // login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await loginUser(loginForm.email, loginForm.password);
      if (res.token) {
        Cookies.set("token", res.token, { expires: 1 });
        Cookies.set("userId", res.userId, { expires: 1 });
      }
      router.push("/dashboard/project");
    } catch (err: any) {
      setErrorMsg(
        err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const res = await registerUser(registerForm);
      if (res.token) {
        Cookies.set("token", res.token, { expires: 1 });
        Cookies.set("userId", res.userId, { expires: 1 });
      }
      router.push("/skill");
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden mx-auto bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      {/* Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        <div
          className={`flex transition-transform duration-700 ease-in-out ${
            isLogin ? "-translate-x-1/2" : "translate-x-0"
          } w-[200%]`}
        >
          {/* REGISTER */}
          <div className="w-1/2 flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 text-white">
              <h1 className="text-3xl font-bold mb-2 text-center">
                Create Account
              </h1>
              <p className="text-sm text-gray-200 mb-6 text-center">
                Join us and start your journey
              </p>

              {/* Error Message for Register */}
              {!isLogin && errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-100 font-medium">
                        {errorMsg}
                      </p>
                    </div>
                    <button
                      onClick={() => setErrorMsg("")}
                      className="cursor-pointer text-red-200 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-3 w-full max-w-sm mx-auto"
              >
                {["name", "email", "password", "address", "job"].map(
                  (field) => (
                    <input
                      key={field}
                      type={
                        field === "password"
                          ? "password"
                          : field === "email"
                          ? "email"
                          : "text"
                      }
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={(registerForm as any)[field]}
                      onChange={(e) => {
                        setRegisterForm({
                          ...registerForm,
                          [field]: e.target.value,
                        });
                        if (errorMsg) setErrorMsg("");
                      }}
                      className="w-full px-4 py-3 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-yellow-300 outline-none transition-all"
                      required={["name", "email", "password"].includes(field)}
                    />
                  )
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full py-3 rounded-full bg-yellow-300 text-blue-900 font-bold shadow-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              <p className="text-sm mt-6 text-gray-200 text-center">
                Already have an account?{" "}
                <button
                  onClick={() => switchForm(true)}
                  className="cursor-pointer underline hover:text-yellow-300 transition-colors font-semibold"
                >
                  Log In
                </button>
              </p>
            </div>
            <div
              className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/bg-right-register.png')" }}
            ></div>
          </div>

          {/* LOGIN */}
          <div className="w-1/2 flex flex-col md:flex-row min-h-[100px] md:min-h-[600px] justify-center">
            <div
              className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/bg-right-register.png')" }}
            ></div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 text-white">
              <h1 className="text-3xl font-bold mb-2 text-center">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-200 mb-6 text-center">
                Log in to continue
              </p>

              {/* Error Message for Login */}
              {isLogin && errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/30 backdrop-blur-sm">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-red-100 font-medium">
                        {errorMsg}
                      </p>
                    </div>
                    <button
                      onClick={() => setErrorMsg("")}
                      className="cursor-pointer text-red-200 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleLoginSubmit}
                className="space-y-4 w-full max-w-sm mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, email: e.target.value });
                    if (errorMsg) setErrorMsg("");
                  }}
                  className="w-full px-4 py-3 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-yellow-300 outline-none transition-all"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, password: e.target.value });
                    if (errorMsg) setErrorMsg("");
                  }}
                  className="w-full px-4 py-3 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-yellow-300 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full py-3 rounded-full bg-yellow-300 text-blue-900 font-bold shadow-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                      Logging In...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>
              <p className="text-sm mt-6 text-gray-200 text-center">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => switchForm(false)}
                  className="cursor-pointer underline hover:text-yellow-300 transition-colors font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
