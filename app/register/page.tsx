export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgRegister.png')" }}
    >
      <div className="bg-white/80 p-10 rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row items-center">
        {/* Bagian Kiri - Form */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Sign Up</h2>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Job"
              className="w-full px-4 py-2 shadow bg-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-[#FFEEAA] hover:bg-yellow-400 text-gray-900 font-medium shadow-md"
            >
              Sign Up →
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-2 text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <p className="text-sm text-gray-700">
            You have already account?{" "}
            <a
              href="/login"
              className="text-gray-900 font-medium underline hover:text-blue-600"
            >
              Log In →
            </a>
          </p>
        </div>

        {/* Bagian Kanan - Info */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-10 text-center md:text-left">
          <h3 className="text-3xl font-bold text-blue-600 mb-4 px-20">
            Create Your Account
          </h3>
          <p className="text-gray-700 px-20">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </div>
  );
}
