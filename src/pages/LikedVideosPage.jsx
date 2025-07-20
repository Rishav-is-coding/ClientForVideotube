// videotube-frontend/src/pages/LikedVideosPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedVideos } from '../features/like/likeSlice.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import VideoCard from '../components/VideoCard.jsx'; // Assuming you have this component

const LikedVideosPage = () => {
  const dispatch = useDispatch();
  const { likedVideos, loading, error } = useSelector((state) => state.like);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getLikedVideos());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return <div className="text-red-500 text-center text-xl mt-8">Please login to view your liked videos.</div>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-8">Error loading liked videos: {error}</div>;
  }

  if (likedVideos.length === 0 && !loading) {
    return <div className="text-gray-400 text-center text-xl mt-8">You haven't liked any videos yet.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Your Liked Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {likedVideos.map((video) => (
          // The backend structure for likedVideos directly contains video objects
          // If it was just video IDs, you'd need to fetch full video details here.
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideosPage;