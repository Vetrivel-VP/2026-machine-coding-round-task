import React from "react";

const Star = ({ fill = 0, size = 36, ...props }) => {
  return (
    <div
      className="relative cursor-pointer"
      style={{ width: size, height: size }}
      {...props}
    >
      {/* empty star */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute w-full h-full text-gray-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.037 6.263a1 1 0 00.95.69h6.583c.969 0 1.371 1.24.588 1.81l-5.329 3.873a1 1 0 00-.364 1.118l2.037 6.263c.3.921-.755 1.688-1.538 1.118l-5.329-3.873a1 1 0 00-1.176 0l-5.329 3.873c-.783.57-1.838-.197-1.538-1.118l2.037-6.263a1 1 0 00-.364-1.118L.49 11.69c-.783-.57-.38-1.81.588-1.81h6.583a1 1 0 00.95-.69l2.037-6.263z"
        />
      </svg>

      {/* filled portions */}
      <div
        className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
        style={{ width: `${fill * 100}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-yellow-400"
          style={{ width: size, height: size }}
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.037 6.263a1 1 0 00.95.69h6.583c.969 0 1.371 1.24.588 1.81l-5.329 3.873a1 1 0 00-.364 1.118l2.037 6.263c.3.921-.755 1.688-1.538 1.118l-5.329-3.873a1 1 0 00-1.176 0l-5.329 3.873c-.783.57-1.838-.197-1.538-1.118l2.037-6.263a1 1 0 00-.364-1.118L.49 11.69c-.783-.57-.38-1.81.588-1.81h6.583a1 1 0 00.95-.69l2.037-6.263z" />
        </svg>
      </div>
    </div>
  );
};

const StarRatings = ({
  totalStars = 5,
  value = 0,
  onChange,
  precision = 0.1,
  size = 36,
  label = "Rate this product",
}) => {
  const [hoverValue, setHoverValue] = React.useState(null);
  const displayValue = hoverValue ?? value;

  const getFill = (index) => {
    const diff = displayValue - index;
    return Math.max(0, Math.min(diff, 1));
  };

  const handleMouseMove = (e, index) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();

    const percent = (e.clientX - left) / width;

    const raw = index + percent;

    // snap to precision (Amazon feel)
    const snapped = Math.round(raw / precision) * precision;
    setHoverValue(snapped);
  };

  const handleClick = () => {
    onChange?.(hoverValue ?? value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <span className="text-sm font-medium text-neutral-800">{label}</span>

      <div className=" flex gap-2 bg-white px-6 py-3 rounded-2xl shadow-md">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            size={size}
            fill={getFill(index)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={handleClick}
          />
        ))}
      </div>

      <span className="text-xs text-neutral-500">
        {displayValue.toFixed(1)} / {totalStars}
      </span>
    </div>
  );
};

export default StarRatings;
