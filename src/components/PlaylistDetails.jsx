import React, { useEffect, useState } from 'react';
import { getPlaylistById } from '../api/playlist';
import { useParams } from 'react-router-dom';
import VideoCard from './VideoCard';

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPlaylistById(playlistId).then(res => setPlaylist(res.data.data[0]));
  }, [playlistId]);

  if (!playlist) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-dark mb-2">{playlist.name}</h2>
      <div className="text-gray-600 mb-4">{playlist.description}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {playlist.videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
