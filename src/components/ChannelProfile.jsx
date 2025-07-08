import React, { useEffect, useState } from 'react';
import { getChannelProfile } from '../api/user';
import { toggleSubscription, getChannelSubscribers } from '../api/subscription';
import { useParams } from 'react-router-dom';

export default function ChannelProfile() {
  const { userName } = useParams();
  const [profile, setProfile] = useState(null);
  const [subscribers, setSubscribers] = useState(0);

  useEffect(() => {
    getChannelProfile(userName).then(res => setProfile(res.data.data));
    // Optionally fetch subscriber count
    // getChannelSubscribers(profile?._id).then(res => setSubscribers(res.data.data.subscribers));
  }, [userName]);

  const handleSubscribe = async () => {
    if (profile) {
      await toggleSubscription(profile._id);
      // Optionally refresh profile/subscriber count
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
      <img src={profile.avatar} alt="avatar" className="w-20 h-20 rounded-full border-4 border-primary" />
      <div>
        <h2 className="text-2xl font-bold text-primary-dark">{profile.fullName}</h2>
        <div className="text-gray-600">@{profile.userName}</div>
        <div className="text-sm text-gray-500 mt-2">Subscribers: {profile.subscribersCount}</div>
        <button onClick={handleSubscribe} className="mt-3 bg-primary text-white px-4 py-2 rounded">
          {profile.isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
