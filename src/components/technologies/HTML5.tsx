import React from 'react';

export default function HTML5({ ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>HTML5</title>
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003-.23-2.622L5.412 4.41l.551 6.305h9.453l-.348 3.904-3.085.834-3.14-.849-.199-2.308H6.12l.338 4.673 5.533 1.545 5.485-1.53.72-8.08H8.53z" />
    </svg>
  );
}
