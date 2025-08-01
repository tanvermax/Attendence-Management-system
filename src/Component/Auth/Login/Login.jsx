import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../PrivetRoute/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth(); // import and use this hook at the top
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', form);
      const { message,userId ,role} = response.data;

      console.log(response.data)
      console.log(message)
      login({ userId, email: form.email,role }); // this updates context and localStorage

      alert(message || 'Login successful!');
      navigate("/")
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
    // You can validate here or send to backend
    console.log("Login Submitted", form);
    onLogin && onLogin(form); // Optional callback
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      {error}
    </div>
  );
};

export default Login;
