import React, { useState, useEffect } from 'react';
import MFAPI from '../apiMF';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState('');
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFunds = async () => {
      if (!query) {
        setFunds([]);
        return;
      }
      
      setLoading(true);
      try {
        const res = await MFAPI.get('/mf');
        const allFunds = res.data;
        const filtered = allFunds.filter(fund =>
          fund.schemeName.toLowerCase().includes(query.toLowerCase())
        );
        setFunds(filtered);
      } catch (err) {
        console.error(err);
        alert('Error fetching data');
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchFunds, 300); // Debounce for 300ms
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center justify-start py-16 px-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-2xl flex flex-col items-center space-y-8 border border-slate-200">
        <h1 className="text-4xl font-bold text-gray-800 text-center drop-shadow-sm tracking-tight">
          Search Mutual Funds
        </h1>
        <div className="flex w-full">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter fund name..."
            className="flex-1 px-5 py-3 rounded-l-xl bg-slate-100 text-gray-800 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 border border-slate-200 transition"
          />
          <button
            onClick={() => navigate('/saved')}
            className="px-6 py-3 bg-blue-400 text-white font-bold rounded-r-xl shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            Saved
          </button>
        </div>
        <button
          onClick={() => navigate('/saved')}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold shadow hover:from-green-500 hover:to-blue-500 transition-all duration-300"
        >
          View Saved Funds
        </button>
        {loading && <p className="text-gray-700 font-medium animate-pulse">Loading...</p>}
        {!loading && query && funds.length === 0 && (
          <p className="text-gray-500 text-center text-lg font-medium">No results found</p>
        )}
        {!loading && !query && (
          <p className="text-gray-500 text-center text-lg font-medium">No results yet</p>
        )}
        {!loading && funds.length > 0 && (
          <ul className="w-full space-y-4">
            {funds.map(fund => (
              <li
                key={fund.schemeCode}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl border border-slate-200 shadow hover:shadow-lg transition-all duration-200 cursor-pointer font-semibold text-gray-800"
                onClick={() => navigate(`/fund/${fund.schemeCode}`)}
              >
                {fund.schemeName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}