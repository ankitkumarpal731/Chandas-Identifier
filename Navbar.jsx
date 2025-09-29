import React from 'react';

export default function Navbar({ darkMode, toggleTheme, openAbout }) {
  return (
    <header className="header flex items-center justify-between px-8 py-5 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 shadow-lg backdrop-blur-md rounded-b-2xl">
      <div className="logo flex items-center gap-2 text-3xl font-extrabold tracking-tight text-primary drop-shadow">
        <i className="fa-solid fa-book-open text-indigo-500 mr-2"></i>
        Chandas Identifier
      </div>
      <nav className="nav-links flex gap-6 text-lg font-semibold">
        <a href="#features" className="hover:text-indigo-600 transition"><i className="fa-solid fa-bolt mr-1"></i>Features</a>
        <a href="#about" className="hover:text-indigo-600 transition" onClick={openAbout}><i className="fa-solid fa-circle-info mr-1"></i>About</a>
      </nav>
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle dark mode"
          className="rounded-full p-2 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring bg-gradient-to-tr from-indigo-100 to-white dark:from-gray-800 dark:to-gray-950 shadow"
          onClick={toggleTheme}
        >
          {darkMode ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
        </button>
        <a href="#upload" className="cta-button bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 focus:outline-none focus:ring shadow flex items-center gap-2">
          <i className="fa-solid fa-upload"></i> Upload
        </a>
      </div>
    </header>
  );
}
