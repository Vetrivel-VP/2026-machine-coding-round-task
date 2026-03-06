import React from "react";
import { X } from "lucide-react";

const variantStyles = {
  success: "bg-green-50 border-green-500 text-green-700",
  error: "bg-red-50 border-red-500 text-red-700",
  warning: "bg-yellow-50 border-yellow-500 text-yellow-700",
  info: "bg-blue-50 border-blue-500 text-blue-700",
  message: "bg-neutral-50 border-neutral-500 text-neutral-700",
};

const Toast = ({ id, message, type = "message", onClose }) => {
  const [visible, setvisible] = React.useState(false);

  React.useEffect(() => {
    setvisible(true);
  }, []);

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out
        ${visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}
        w-80 border-l-4 shadow-lg rounded-xl backdrop-blur-md
        ${variantStyles[type]}
        `}
    >
      <div className="flex items-start justify-between p-4">
        <div className="text-sm font-medium leading-relaxed">{message}</div>

        <button
          type="button"
          onClick={() => {
            setvisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
