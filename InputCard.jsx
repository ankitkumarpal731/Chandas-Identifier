import React from 'react';

export default function InputCard({ input, setInput, hasSeparators, setHasSeparators, script, setScript, loading, handleDetect, handleClear, handleSample }) {
  return (
    <section className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 flex flex-col gap-4 animate-fade-in">
  <label htmlFor="shloka" className="text-2xl font-bold mb-3 text-primary flex items-center gap-2">
        <i className="fa-solid fa-pen-nib text-indigo-500"></i>
        Paste Shloka (Devanagari/Roman)
      </label>
      <textarea
        id="shloka"
        rows={4}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 p-4 mb-2 bg-gray-50 dark:bg-gray-900 text-lg focus:outline-none focus:ring font-mono shadow"
        value={input}
        onChange={e => setInput(e.target.value)}
        aria-label="Paste Shloka"
      />
      <div className="flex flex-wrap items-center gap-6 mb-2">
        <label className="flex items-center gap-2 text-base">
          <input
            type="checkbox"
            checked={hasSeparators}
            onChange={e => setHasSeparators(e.target.checked)}
            className="accent-primary focus:ring"
          />
          <span><i className="fa-solid fa-bars-staggered mr-1"></i>Has pāda separators (| ||)</span>
        </label>
        <label className="flex items-center gap-2 text-base">
          <input
            type="checkbox"
            checked={script === 'auto'}
            onChange={e => setScript(e.target.checked ? 'auto' : 'devanagari')}
            className="accent-primary focus:ring"
          />
          <span><i className="fa-solid fa-wand-magic-sparkles mr-1"></i>Auto-detect script</span>
        </label>
        <select
          value={script}
          onChange={e => setScript(e.target.value)}
          className="rounded-xl border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring text-base"
          aria-label="Script select"
        >
          <option value="auto">Auto</option>
          <option value="devanagari">Devanagari</option>
          <option value="roman">Roman</option>
        </select>
      </div>
      <div className="flex gap-4 mb-2">
        <button
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 focus:outline-none focus:ring disabled:opacity-50 shadow flex items-center gap-2"
          onClick={handleDetect}
          disabled={loading || !input.trim()}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          {loading ? 'Detecting...' : 'Detect Chandas'}
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring shadow flex items-center gap-2"
          onClick={handleClear}
          disabled={loading}
        ><i className="fa-solid fa-eraser"></i> Clear</button>
        <button
          className="bg-emerald-100 text-success px-6 py-2 rounded-xl font-bold hover:bg-emerald-200 focus:outline-none focus:ring shadow flex items-center gap-2"
          onClick={handleSample}
          disabled={loading}
        ><i className="fa-solid fa-flask"></i> Try Sample</button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-mono flex items-center gap-2"><i className="fa-solid fa-lightbulb text-yellow-400"></i>Example: vande gurūṇāṁ caraṇāravinde | … ||</p>
    </section>
  );
}
