// videotube-frontend/src/features/video/VideoDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoById, clearCurrentVideo, getRecommendedVideos } from './videoSlice';
import { toggleVideoLike } from '../like/likeSlice.js';
import { toggleSubscription, getSubscribedChannels } from '../subscription/subscriptionSlice.js'; // Import getSubscribedChannels
// Import playlist actions
import {
  getUserPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  clearUserPlaylists
} from '../playlist/playlistSlice.js';
import LoadingSpinner from '../../components/LoadingSpinner.jsx';
import CommentSection from '../comment/CommentSection.jsx';

const VideoDetail = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { currentVideo, loading, error, recommendedVideos } = useSelector((state) => state.video);
  const { user: currentUser } = useSelector((state) => state.auth);
  // Get playlists state
  const { userPlaylists, loading: playlistsLoading, error: playlistsError } = useSelector((state) => state.playlist);

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlistActionMessage, setPlaylistActionMessage] = useState('');

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
      dispatch(getRecommendedVideos(videoId));
    }
    return () => {
      dispatch(clearCurrentVideo());
      dispatch(clearUserPlaylists()); // Clear playlists from Redux on unmount
    };
  }, [videoId, dispatch]);

  // Fetch user playlists when modal is opened and user is authenticated
  useEffect(() => {
    if (showPlaylistModal && currentUser) {
      dispatch(getUserPlaylists(currentUser.userName));
    } else if (!showPlaylistModal) {
      dispatch(clearUserPlaylists()); // Clear playlists when modal closes
    }
  }, [showPlaylistModal, currentUser, dispatch]);

  const handleLikeToggle = () => {
    if (!currentUser) {
      alert('Please login to like videos!');
      return;
    }
    dispatch(toggleVideoLike(videoId));
  };

  const handleSubscribeToggle = async () => { // Made async to await dispatch
    if (!currentUser) {
      alert('Please login to subscribe!');
      return;
    }
    if (currentVideo?.owner?._id) {
      const resultAction = await dispatch(toggleSubscription(currentVideo.owner._id));
      // FIX: Re-fetch subscribed channels for the sidebar after toggle
      if (toggleSubscription.fulfilled.match(resultAction) && currentUser?.userName) {
        dispatch(getSubscribedChannels(currentUser.userName));
      } else if (toggleSubscription.rejected.match(resultAction)) {
        alert(resultAction.payload || "Failed to toggle subscription");
      }
    }
  };

  const handleTogglePlaylistModal = () => {
    if (!currentUser) {
      alert('Please login to add videos to playlists!');
      return;
    }
    setShowPlaylistModal(prev => !prev);
  };

  const handleToggleVideoInPlaylist = async (playlistId, isVideoInPlaylist) => {
    setPlaylistActionMessage('');
    if (isVideoInPlaylist) {
      const resultAction = await dispatch(removeVideoFromPlaylist({ playlistId, videoId }));
      if (removeVideoFromPlaylist.fulfilled.match(resultAction)) {
        setPlaylistActionMessage(`Removed from playlist.`);
        dispatch(getUserPlaylists(currentUser.userName)); // Re-fetch for modal consistency
      } else {
        setPlaylistActionMessage(resultAction.payload || 'Failed to remove from playlist.');
      }
    } else {
      const resultAction = await dispatch(addVideoToPlaylist({ playlistId, videoId }));
      if (addVideoToPlaylist.fulfilled.match(resultAction)) {
        setPlaylistActionMessage(`Added to playlist.`);
        dispatch(getUserPlaylists(currentUser.userName)); // Re-fetch for modal consistency
      } else {
        setPlaylistActionMessage(resultAction.payload || 'Failed to add to playlist.');
      }
    }
  };

  if (loading && !currentVideo) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-8">Error: {error}</div>;
  }

  if (!currentVideo) {
    return <div className="text-gray-400 text-center text-xl mt-8">Video not found.</div>;
  }

  const formatNumber = (num) => {
    if (num === undefined || num === null) return 'N/A';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  const timeSincePublished = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };


  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="lg:w-2/3">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <video
            controls
            src={currentVideo.videoFile?.url}
            poster={currentVideo.thumbnail?.url}
            className="w-full h-full object-contain"
          ></video>
        </div>

        {/* Video Info */}
        <h1 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h1>
        <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
          <p>{formatNumber(currentVideo.views)} views • {timeSincePublished(currentVideo.createdAt)}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center px-3 py-1 rounded-full text-sm ${
                currentVideo.isLiked ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-1">{currentVideo.isLiked ? '❤️' : '👍'}</span> {formatNumber(currentVideo.likesCount)}
            </button>
            <button
              onClick={handleTogglePlaylistModal}
              className="flex items-center px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              <span className="mr-1">💾</span> Save (Playlist)
            </button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center justify-between border-t border-b border-gray-700 py-4 mb-4">
          <Link to={`/channel/${currentVideo.owner?.userName}`} className="flex items-center">
            <img
              src={currentVideo.owner?.avatar}
              alt={currentVideo.owner?.fullName}
              className="w-12 h-12 rounded-full object-cover mr-3 border border-gray-600"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{currentVideo.owner?.fullName || currentVideo.owner?.userName}</h3>
              <p className="text-gray-400 text-sm">
                {formatNumber(currentVideo.owner?.subscriberCount)} subscribers
              </p>
            </div>
          </Link>
          {currentUser?._id !== currentVideo.owner?._id && (
            <button
              onClick={handleSubscribeToggle}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                currentVideo.owner?.isSubscribed ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {currentVideo.owner?.isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          )}
        </div>

        {/* Video Description */}
        <div className="bg-gray-700 p-4 rounded-lg text-gray-300 text-sm mb-6">
          <p className="whitespace-pre-wrap">{currentVideo.description}</p>
        </div>

        {/* Comments Section */}
        <CommentSection videoId={videoId} />
      </div>

      {/* Recommended Videos */}
      <div className="lg:w-1/3">
        <h2 className="text-xl font-bold text-white mb-4">Recommended Videos</h2>
        <div className="space-y-4">
          {recommendedVideos.length > 0 ? (
            recommendedVideos.map((video) => (
              <Link to={`/watch/${video._id}`} key={video._id} className="flex items-start bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
                <img
                  src={video.thumbnail?.url}
                  alt={video.title}
                  className="w-32 h-20 object-cover flex-shrink-0"
                />
                <div className="p-3">
                  <h4 className="text-white text-md font-semibold line-clamp-2">{video.title}</h4>
                  <p className="text-gray-400 text-sm">{video.owner?.fullName || video.owner?.userName}</p>
                  <p className="text-gray-500 text-xs">{formatNumber(video.views)} views</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No recommended videos found.</p>
          )}
        </div>
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add to Playlist</h2>
              <button
                onClick={handleTogglePlaylistModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            {playlistActionMessage && (
              <p className={`mb-4 text-center text-sm ${playlistActionMessage.includes('Added') || playlistActionMessage.includes('Removed') ? 'text-green-400' : 'text-red-400'}`}>
                {playlistActionMessage}
              </p>
            )}

            {playlistsLoading ? (
              <p className="text-gray-400">Loading playlists...</p>
            ) : playlistsError ? (
              <p className="text-red-400">Error loading playlists.</p>
            ) : userPlaylists.length > 0 ? (
              <ul className="space-y-3">
                {userPlaylists.map((playlist) => {
                  const isVideoInPlaylist = playlist.videos.some(vid => vid._id === videoId);
                  return (
                    <li key={playlist._id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                      <label className="flex items-center text-white cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={isVideoInPlaylist}
                          onChange={() => handleToggleVideoInPlaylist(playlist._id, isVideoInPlaylist)}
                          className="form-checkbox h-5 w-5 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500 transition-colors duration-200"
                        />
                        <span className="ml-3 font-semibold">{playlist.name}</span>
                      </label>
                      <span className="text-gray-400 text-sm ml-2">({playlist.videos.length} videos)</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-400">You don't have any playlists yet. <Link to="/create-playlist" className="text-purple-400 hover:underline">Create one!</Link></p>
            )}

            <button
              onClick={handleTogglePlaylistModal}
              className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetail;