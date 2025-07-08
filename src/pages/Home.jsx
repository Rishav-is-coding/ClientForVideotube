import React, { useEffect, useState } from 'react';
import { getVideos } from '../api/video';
import VideoCard from '../components/VideoCard';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos().then(res => setVideos(res.data.data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map(video => <VideoCard key={video._id} video={video} />)}
    </div>
  );
}
