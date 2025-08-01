import axios from "axios";
import React, { useState } from "react";

const Ragistration = ({ onRegister }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff" // default role
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
   

    console.log("Registration Submitted", form);

    axios.post("http://localhost:5000/user",form)
     .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });
    onRegister && onRegister(form); // Optional callback
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {/* Full Name */}
        <div className="mb-3">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your Name"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
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

        {/* Password */}
        <div className="mb-3">
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

        {/* Confirm Password */}
       

        {/* Role */}
        <div className="mb-6">
          <label className="block mb-1">Select Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Ragistration;
