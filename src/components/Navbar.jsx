import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-primary text-white shadow">
      <Link to="/" className="text-2xl font-bold tracking-wide">BlueTube</Link>
      <div>
        <Link to="/login" className="mr-4 hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}
