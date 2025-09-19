
import React from 'react';

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
    <path d="M12 2v10"></path>
    <path d="M12 12a4 4 0 1 1-4-4h4"></path>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
  </svg>
);

export default TikTokIcon;
