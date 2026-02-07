import { Mail, Lock } from "lucide-react";

const LoginModal = () => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
      
      {/* Logo + Heading */}
      <div className="text-center mb-6">
        <div className="mx-auto mb-3 w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
          CRM
        </div>
        <h2 className="text-xl font-semibold">CRM Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">
          Login to your account
        </p>

        {/* UPDATED: Demo explanation */}
        <p className="text-xs text-gray-400">
          You are viewing a public demo. Login enables access to real data.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        
        {/* Email */}
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>
          <button
            type="button"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign in */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        {/* Sign up */}
        <button
          type="button"
          className="w-full border py-2 rounded-md text-sm hover:bg-gray-50"
        >
          Sign Up
        </button>

        {/* ✅ ADDED: View Demo */}
        <button
          type="button"
          onClick={() => window.location.href = "/"}
          className="w-full text-sm text-gray-600 hover:underline"
        >
          View Demo Dashboard
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <div className="flex-1 h-px bg-gray-200" />
          Or
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Microsoft login */}
        <button
          type="button"
          className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            className="w-4 h-4"
          />
          <span className="text-sm">Sign in with Microsoft</span>
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
