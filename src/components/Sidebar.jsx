// videotube-frontend/src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <aside className="w-64 bg-gray-800 p-4 border-r border-gray-700 h-full overflow-y-auto hidden md:block">
      <nav className="space-y-4">
        <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
          <span className="text-xl">🏠</span>
          <span>Home</span>
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/upload" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
              <span className="text-xl">⬆️</span>
              <span>Upload</span>
            </Link>
            <Link to="/liked-videos" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
              <span className="text-xl">👍</span>
              <span>Liked Videos</span>
            </Link>
            <Link to="/history" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
              <span className="text-xl">🕒</span>
              <span>Watch History</span>
            </Link>
            <Link to="/create-playlist" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md">
              <span className="text-xl">➕</span>
              <span>Create Playlist</span>
            </Link>
            {/* You can add more specific links here based on user data, e.g., playlists owned by user */}
          </>
        )}
        <hr className="border-gray-700" />
        <h3 className="text-gray-400 text-sm font-semibold mb-2 uppercase">Subscriptions</h3>
        {/* Placeholder for subscribed channels list */}
        <p className="text-gray-500 text-sm">Login to see subscriptions</p>
        {/* In a real app, you'd fetch and list subscribed channels here */}
      </nav>
    </aside>
  );
};

export default Sidebar;