import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../api/user';
import { useParams } from 'react-router-dom';

export default function DashboardStats() {
  const { userName } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardData(userName).then(res => setStats(res.data.data));
  }, [userName]);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div>
        <div className="text-lg text-primary-dark font-bold">{stats.totalVideos.length}</div>
        <div className="text-gray-600">Videos</div>
      </div>
      <div>
        <div className="text-lg text-primary-dark font-bold">{stats.totalViews}</div>
        <div className="text-gray-600">Views</div>
      </div>
      <div>
        <div className="text-lg text-primary-dark font-bold">{stats.totalLikes}</div>
        <div className="text-gray-600">Likes</div>
      </div>
      <div>
        <div className="text-lg text-primary-dark font-bold">{stats.totalSubscribers}</div>
        <div className="text-gray-600">Subscribers</div>
      </div>
    </div>
  );
}
