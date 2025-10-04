"use client";
import { useState } from "react";
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

  // login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(loginForm.email, loginForm.password);
      if (res.token) {
        Cookies.set("token", res.token, { expires: 1 });
        Cookies.set("userId", res.userId, { expires: 1 });
      }
      router.push("/dashboard/project");
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(registerForm);
      if (res.token) {
        Cookies.set("token", res.token, { expires: 1 });
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden mx-auto bg-cover bg-center"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      {/* Card */}
      <div className="relative z-10 w-full max-w-4xl mx-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden justify-center items-center">
        <div
          className={`flex transition-transform duration-700 ease-in-out justify-center items-center ${
            isLogin ? "-translate-x-1/2" : "translate-x-0"
          } w-[200%]`}
        >
          {/* REGISTER */}
          <div className="w-1/2 flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 text-white items-center">
              <h1 className="text-3xl font-bold mb-6">Create Account</h1>
              <form
                onSubmit={handleRegisterSubmit}
                className="space-y-4 w-full max-w-sm"
              >
                {["name", "email", "password", "address", "job"].map(
                  (field) => (
                    <input
                      key={field}
                      type={field === "password" ? "password" : "text"}
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={(registerForm as any)[field]}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          [field]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-yellow-300 outline-none"
                      required={["name", "email", "password"].includes(field)}
                    />
                  )
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full py-3 rounded-full bg-yellow-300 text-blue-900 font-bold shadow-lg hover:bg-yellow-400 transition"
                >
                  {loading ? "Loading..." : "Sign Up →"}
                </button>
              </form>
              <p className="text-sm mt-6 text-gray-200">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="cursor-pointer underline hover:text-yellow-300"
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
          <div className="w-1/2 flex flex-col md:flex-row min-h-[100px] md:min-h-[600px]">
            <div
              className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/bg-right-register.png')" }}
            ></div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 lg:p-12 text-white items-center">
              <h1 className="text-3xl font-bold mb-6">Log In</h1>
              <form
                onSubmit={handleLoginSubmit}
                className="space-y-4 justify-center items-center"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-yellow-300 outline-none"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-full bg-white/20 placeholder-gray-200 text-white focus:ring-2 focus:ring-yellow-300 outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full py-3 rounded-full bg-yellow-300 text-blue-900 font-bold shadow-lg hover:bg-yellow-400 transition"
                >
                  {loading ? "Loading..." : "Log In →"}
                </button>
              </form>
              <p className="text-sm mt-6 text-gray-200">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="cursor-pointer underline hover:text-yellow-300"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-300 text-sm">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}
