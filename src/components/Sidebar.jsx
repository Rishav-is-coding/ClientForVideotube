import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-primary-light text-white p-4">
      <ul className="space-y-4">
        <li><Link to="/" className="hover:text-primary-dark">Home</Link></li>
        <li><Link to="/playlists" className="hover:text-primary-dark">Playlists</Link></li>
        <li><Link to="/subscriptions" className="hover:text-primary-dark">Subscriptions</Link></li>
        <li><Link to="/history" className="hover:text-primary-dark">History</Link></li>
        <li><Link to="/dashboard" className="hover:text-primary-dark">Dashboard</Link></li>
      </ul>
    </aside>
  );
}
