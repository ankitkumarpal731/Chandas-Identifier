import React from 'react';

export default function AboutModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-950 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3">
          <i className="fa-solid fa-circle-info text-indigo-500 text-2xl"></i>
          <h2 className="text-2xl font-extrabold text-primary">About Chandas Identifier</h2>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-base">
          <li>Detects Sanskrit verse meter (Chandas) from pasted text</li>
          <li>Supports Devanagari and Roman scripts</li>
          <li>Visualizes syllables, Laghu/Guru, and Gaṇa grouping</li>
          <li>Based on Pingala’s Chandas Shastra and Meru Prastara</li>
          <li>References: Pingala, IKS, Smart India Hackathon 2025</li>
          <li>Export results as JSON or PDF</li>
        </ul>
        <button
          className="mt-6 px-6 py-2 rounded-xl bg-primary text-white hover:bg-indigo-700 focus:outline-none focus:ring text-base font-semibold shadow flex items-center gap-2"
          onClick={onClose}
        ><i className="fa-solid fa-xmark"></i> Close</button>
      </div>
    </div>
  );
}
