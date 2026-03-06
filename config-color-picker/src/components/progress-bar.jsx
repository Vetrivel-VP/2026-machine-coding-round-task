import React from "react";

const ProgressBar = ({ value }) => {
  const [progress, setProgress] = React.useState(value || 13);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-3/4 items-center justify-center gap-4 h-6">
      {/* container */}
      <div className=" relative w-3/5 h-4 bg-gray-200 rounded-full overflow-hidden  shadow-inner">
        {/* fill */}
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* label */}
      <span className="text-sm font-medium text-gray-700 transition-all duration-700 ease-in-out">
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;
