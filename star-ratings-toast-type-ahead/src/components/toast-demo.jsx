import React from "react";
import { useToast } from "../hooks/use-toast";

const ToastDemo = () => {
  const toast = useToast();

  return (
    <div className="space-x-4 p-10">
      <button
        type="button"
        onClick={() => toast.success("This is a success message.")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:shadow-lg transition duration-150 shadow"
      >
        Success
      </button>

      <button
        type="button"
        onClick={() => toast.error("This is a error message.")}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:shadow-lg transition duration-150 shadow"
      >
        Error
      </button>

      <button
        type="button"
        onClick={() => toast.info("This is a info message.")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition duration-150 shadow"
      >
        Info
      </button>

      <button
        type="button"
        onClick={() => toast.warning("This is a warning message.")}
        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:shadow-lg transition duration-150 shadow"
      >
        Warning
      </button>

      <button
        type="button"
        onClick={() => toast.message("This is a message message.")}
        className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:shadow-lg transition duration-150 shadow"
      >
        Message
      </button>
    </div>
  );
};

export default ToastDemo;
