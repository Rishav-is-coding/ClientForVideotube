import React, { useEffect, useState } from 'react';
import { getWatchHistory } from '../api/user';
import VideoCard from './VideoCard';

export default function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getWatchHistory().then(res => setHistory(res.data.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-dark mb-4">Watch History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {history.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}
