import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5555/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      alert("✅ Signed in successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Sign in error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "❌ Sign In failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Sign In Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
            Sign In
          </h2>
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
            >
              Sign In
            </button>
            <p className="text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Info Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-6">
          <div className="text-center">
            <h2 className="mt-4 text-2xl font-bold text-white">Welcome Back</h2>
            <h1 className="text-3xl font-extrabold text-white mt-1">
              ADHITHYA BOOK STORE
            </h1>
            <p className="text-white text-sm mt-3">
              Dive back into the world of books 📚
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
