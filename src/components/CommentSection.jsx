import React, { useEffect, useState } from 'react';
import { getComments, addComment } from '../api/comment';

export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    getComments(videoId).then(res => setComments(res.data.data.comments));
  }, [videoId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await addComment(videoId, { content });
    setContent('');
    getComments(videoId).then(res => setComments(res.data.data.comments));
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          className="flex-1 border border-primary-light rounded px-3 py-2"
          placeholder="Add a comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className="bg-primary text-white px-4 py-2 rounded" type="submit">
          Comment
        </button>
      </form>
      <ul className="space-y-3">
        {comments.map(c => (
          <li key={c._id} className="bg-gray-50 rounded p-3 border border-primary-light">
            <div className="font-semibold text-primary-dark">{c.owner?.fullName}</div>
            <div>{c.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
