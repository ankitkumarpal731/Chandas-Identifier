import React, { useEffect } from 'react';

export default function Toast({ message, type = 'info', show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const color = type === 'error' ? 'bg-rose-500' : type === 'success' ? 'bg-green-500' : 'bg-indigo-500';

  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl text-white font-bold shadow-lg ${color} animate-fade-in`}
      role="alert"
    >
      {message}
    </div>
  );
}
