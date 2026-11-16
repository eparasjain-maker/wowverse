import React from 'react';

interface MonumentArrowProps {
  className?: string;
  size?: number | string;
}

export const MonumentArrow: React.FC<MonumentArrowProps> = ({
  className = 'w-12 h-12',
  size,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 187 181"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        fill="currentColor"
        d="m145.541 71.171-21.881-6.788-22.451-5.47-21.923-7.15-21.749-8.621 9.824-21.047L75.53 0l43.532 29.8 21.749 14.584 22.229 13.855 21.957 13.377L187 91.46l-2.254 19.645-21.074 14.64-23.439 11.863-43.964 28.522L75.64 181l-7.43-20.505-8.87-20.006 20.551-7.545 22.194-6.247 21.457-8.573 22.277-5.949.425-3.651-23.516 2.651-23.12.445-23.119-.452-25.672 1.437-25.7-.416L0 112.286l.598-40.892 24.713.305 25.603-.729 48.653 2.228 23.161-.624 23.321 1.416-.508-2.812z"
      />
    </svg>
  );
};
