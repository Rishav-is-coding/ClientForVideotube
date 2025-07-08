import React from 'react';
import { Link } from 'react-router-dom';

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition border border-primary-light">
        <img src={video.thumbnail.url} alt={video.title} className="w-full h-40 object-cover rounded-t" />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-primary-dark">{video.title}</h3>
          <p className="text-sm text-gray-600">{video.owner?.fullName}</p>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{video.views} views</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
