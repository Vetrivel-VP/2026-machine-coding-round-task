import React from "react";

const CircularProgressBar = ({
  value = 80,
  size = 120,
  strokeWidth = 10,
  showLabel = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-gray-200"
          fill="transparent"
        />

        {/* progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-blue-600 transition-all duration-500 ease-in-out"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="z-50 absolute text-xl font-bold text-gray-800">
          {value}%
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
