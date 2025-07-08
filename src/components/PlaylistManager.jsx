import React, { useEffect, useState } from 'react';
import { getUserPlaylists, createPlaylist } from '../api/playlist';

export default function PlaylistManager({ userName }) {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getUserPlaylists(userName).then(res => setPlaylists(res.data.data));
  }, [userName]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await createPlaylist({ name });
    setName('');
    getUserPlaylists(userName).then(res => setPlaylists(res.data.data));
  };

  return (
    <div>
      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          className="flex-1 border border-primary-light rounded px-3 py-2"
          placeholder="New playlist name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
          Create
        </button>
      </form>
      <ul className="space-y-2">
        {playlists.map(pl => (
          <li key={pl._id} className="bg-white border-l-4 border-primary-dark px-4 py-2 rounded">
            {pl.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
