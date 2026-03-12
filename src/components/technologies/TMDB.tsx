import React from 'react';

export default function TMDB({ ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="#01B4E4"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>TMDB</title>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}
