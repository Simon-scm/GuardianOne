'use client';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-semibold text-gray-900 -mt-1">Ө</span>
      <svg
        viewBox="0 0 200 40"
        className="h-8"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y="28"
          fontSize="24"
          fontWeight="600"
          fill="currentColor"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.5px"
        >
          GuardianOne
        </text>
      </svg>
    </div>
  );
}

