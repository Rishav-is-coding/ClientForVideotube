import React from 'react';

export default function VideoPlayer({ src }) {
  return (
    <video controls src={src} className="w-full rounded border-2 border-primary" />
  );
}
