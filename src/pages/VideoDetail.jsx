import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById, getRecommended } from '../api/video';
import VideoPlayer from '../components/VideoPlayer';
import CommentSection from '../components/CommentSection';
import VideoCard from '../components/VideoCard';

export default function VideoDetail() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    getVideoById(videoId).then(res => setVideo(res.data.data));
    getRecommended(videoId).then(res => setRecommended(res.data.data));
  }, [videoId]);

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <VideoPlayer src={video.videoFile.url} />
      <h2 className="text-2xl font-bold mt-4 text-primary-dark">{video.title}</h2>
      <p className="text-gray-700">{video.description}</p>
      <CommentSection videoId={video._id} />
      <div className="mt-8">
        <h3 className="text-xl font-bold text-primary-dark mb-2">Recommended</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommended.map(video => <VideoCard key={video._id} video={video} />)}
        </div>
      </div>
    </div>
  );
}
