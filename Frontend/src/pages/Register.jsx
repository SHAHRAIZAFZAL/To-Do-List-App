// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem("token", res.data.token); // ✅ save token
      alert("Registered & logged in!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" onChange={handleChange} placeholder="Password" type="password" required />
      <button type="submit">Register</button>
    </form>
  );
}
