import React from 'react';

export default function Radix({ ...props }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Radix UI</title>
      <path d="M11.984 0v11.969h11.97v.03h.016v-12H11.984zm0 24A5.992 5.992 0 0 0 18 18.016a5.992 5.992 0 0 0-6.016-5.985A5.992 5.992 0 0 0 5.969 18.016 5.992 5.992 0 0 0 11.984 24zm-6.015-11.969A5.992 5.992 0 0 0 11.984 6.047a5.992 5.992 0 0 0-6.015-6A5.992 5.992 0 0 0-.047 6.046a5.992 5.992 0 0 0 6.016 5.985z" />
    </svg>
  );
}
