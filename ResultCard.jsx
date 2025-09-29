import React from 'react';

export default function ResultCard({ loading, result, activePada, setActivePada }) {
  if (loading) {
    return (
      <section className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 animate-pulse flex flex-col gap-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4" />
        <div className="h-6 bg-gray-100 dark:bg-gray-900 rounded w-1/2 mb-2" />
        <div className="h-6 bg-gray-100 dark:bg-gray-900 rounded w-1/4" />
      </section>
    );
  }
  if (!result) return null;
  return (
    <section className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-2xl font-extrabold text-primary drop-shadow">{result.meter}</span>
        <span className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-base font-semibold border border-gray-300 dark:border-gray-700">{result.type}</span>
        <div className="flex items-center gap-2">
          <div className="w-40 h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-4 bg-primary rounded-full"
              style={{ width: `${Math.round(result.confidence * 100)}%` }}
            />
          </div>
          <span className="text-base font-bold text-primary">{Math.round(result.confidence * 100)}%</span>
        </div>
      </div>
      {/* Tabs for padas */}
      <div role="tablist" className="flex gap-3 mb-4">
        {result.padas.map((pada, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-xl border font-bold focus:outline-none focus:ring transition-all duration-150 ${activePada === idx ? 'border-primary bg-indigo-100 dark:bg-gray-900 text-primary shadow' : 'border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
            aria-selected={activePada === idx}
            role="tab"
            tabIndex={0}
            onClick={() => setActivePada(idx)}
            onKeyDown={e => {
              if (e.key === 'ArrowRight') setActivePada((activePada + 1) % result.padas.length);
              if (e.key === 'ArrowLeft') setActivePada((activePada - 1 + result.padas.length) % result.padas.length);
            }}
          >Pada {idx + 1}</button>
        ))}
      </div>
      {/* Pada details (active pada) */}
      {result.padas[activePada] && (
        <div className="flex flex-col gap-3">
          <div className="font-mono text-lg mb-2 bg-gray-50 dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-800 shadow">{result.padas[activePada].text}</div>
          <div className="flex flex-wrap gap-3 mb-2">
            {result.padas[activePada].syllables.map((syll, i) => (
              <span
                key={i}
                className={
                  result.padas[activePada].lg[i] === 'l'
                    ? 'px-3 py-2 border-2 border-primary rounded-xl text-primary bg-white dark:bg-gray-950 font-mono shadow-sm transition-all duration-150'
                    : 'px-3 py-2 border-2 border-primary rounded-xl text-white bg-primary font-mono shadow-lg transition-all duration-150'
                }
                tabIndex={0}
                title={
                  result.padas[activePada].lg[i] === 'g'
                    ? 'Guru by nature (ā/ī/ū/e/o/ai/au) or by position (cluster/anusvāra/visarga)'
                    : 'Laghu: short syllable'
                }
                aria-label={
                  result.padas[activePada].lg[i] === 'g'
                    ? 'Guru syllable'
                    : 'Laghu syllable'
                }
              >
                {syll} <span className="text-xs font-bold">{result.padas[activePada].lg[i].toUpperCase()}</span>
              </span>
            ))}
          </div>
          {/* Gaṇa row */}
          <div className="flex gap-3 items-center mb-2">
            {result.padas[activePada].ganas.map((gana, i) => (
              <span
                key={i}
                className="px-3 py-2 rounded-xl bg-primary text-white text-base font-bold cursor-pointer shadow"
                title={`Gaṇa: ${gana}`}
                onClick={() => navigator.clipboard.writeText(result.padas[activePada].ganas.join(' '))}
              >{gana}</span>
            ))}
            {result.padas[activePada].tail && result.padas[activePada].tail.length > 0 && (
              <span className="px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-base text-gray-500 shadow">{result.padas[activePada].tail.join(' ')}</span>
            )}
          </div>
        </div>
      )}
      {/* Alternates accordion */}
      <div role="region" aria-label="Alternates" className="mt-4">
        <details className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 shadow">
          <summary className="font-bold cursor-pointer text-primary">Alternates</summary>
          <div className="flex flex-col gap-3 mt-3">
            {result.alternates.map((alt, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-base font-semibold border border-gray-300 dark:border-gray-700">{alt.meter}</span>
                <div className="w-24 h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-primary rounded-full"
                    style={{ width: `${Math.round(alt.confidence * 100)}%` }}
                  />
                </div>
                <span className="text-base">{Math.round(alt.confidence * 100)}%</span>
              </div>
            ))}
          </div>
        </details>
      </div>
      {/* Export actions */}
      <div className="flex gap-4 mt-6">
        <button
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 focus:outline-none focus:ring shadow"
          onClick={() => {
            const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'chandas-result.json';
            a.click();
            URL.revokeObjectURL(url);
          }}
        >Export JSON</button>
        <button
          className="bg-amber-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-amber-600 focus:outline-none focus:ring shadow"
          onClick={() => window.print()}
        >Export PDF</button>
      </div>
    </section>
  );
}
