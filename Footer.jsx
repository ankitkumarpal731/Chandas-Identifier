import React from 'react';

export default function Footer() {
  return (
    <footer className="footer text-center py-8 text-base text-gray-500 dark:text-gray-400 font-semibold tracking-wide bg-white/60 dark:bg-gray-950/60 rounded-t-2xl shadow mt-10 flex flex-col items-center gap-2">
      <span>
        Built for <a href="https://www.sih.gov.in/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">Smart India Hackathon 2025</a> • <a href="https://iksindia.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">IKS</a>
      </span>
      <span>
        <a href="#about" className="text-indigo-500 hover:underline">References in About</a>
      </span>
      <span className="flex gap-3 justify-center mt-2">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github text-xl"></i></a>
        <a href="mailto:info@example.com" aria-label="Email"><i className="fa-solid fa-envelope text-xl"></i></a>
      </span>
    </footer>
  );
}
