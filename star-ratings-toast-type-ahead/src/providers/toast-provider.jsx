import { useState, useCallback } from "react";
import { ToastContext } from "../hooks/use-toast";
import { Toast } from "../components";

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "message", duration = 4000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast],
  );

  const toast = {
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    info: (message) => addToast(message, "info"),
    warning: (message) => addToast(message, "warning"),
    message: (msg) => addToast(msg, "message"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* toast container */}
      <div className="fixed top-6 right-6 z-50 space-y-4">
        {toasts.map((toastItem) => (
          <Toast
            key={toastItem.id}
            {...toastItem}
            onClose={() => removeToast(toastItem.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
