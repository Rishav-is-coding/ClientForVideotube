import React, { useState } from 'react';
import { login } from '../../api/user';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ userName: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await login(form);
    navigate('/');
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-lg shadow border border-primary-light">
      <h2 className="text-2xl font-bold text-primary-dark mb-6">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="userName"
          placeholder="Username"
          className="w-full border border-primary-light rounded px-3 py-2"
          value={form.userName.toString()}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border border-primary-light rounded px-3 py-2"
          value={form.password.toString()}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-primary text-white py-2 rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
