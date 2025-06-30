import React, { useEffect, useState } from 'react';
import API from '../api';
import MFAPI from '../apiMF';
import { useNavigate } from 'react-router-dom';

export default function SavedFunds() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedFunds = async () => {
      try {
        const res = await API.get('/funds/saved');
        const savedIds = res.data.savedFunds;

        const fundDetails = await Promise.all(
          savedIds.map(async (id) => {
            try {
              const fundRes = await MFAPI.get(`/mf/${id}`);
              return { id, data: fundRes.data };
            } catch (err) {
              console.error('Error fetching fund:', id, err);
              return null;
            }
          })
        );

        setFunds(fundDetails.filter(f => f !== null));
      } catch (err) {
        console.error(err);
        alert('Error fetching saved funds (maybe not logged in)');
      }
      setLoading(false);
    };

    fetchSavedFunds();
  }, []);

  const handleRemove = async (id) => {
    try {
      await API.post('/funds/remove', { fundId: id });
      setFunds(funds.filter(f => f.id !== id));
      alert('Removed from saved funds');
    } catch (err) {
      console.error(err);
      alert('Error removing fund');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );

  if (funds.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600">
        <p className="text-white/80 text-lg">No saved funds</p>
      </div>
    );

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex justify-center items-start py-16 px-4">
    <div className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-2xl flex flex-col space-y-8 border border-slate-200">
      <h1 className="text-3xl font-bold text-gray-800 text-center tracking-tight drop-shadow-sm mb-2">
        Your Saved Funds
      </h1>
      <ul className="space-y-4">
        {funds.map(fund => (
          <li
            key={fund.id}
            className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl border border-slate-200 shadow hover:shadow-lg transition-all duration-200"
          >
            <span
              className="cursor-pointer font-semibold text-gray-800 hover:text-blue-600 hover:underline transition"
              onClick={() => navigate(`/fund/${fund.id}`)}
            >
              {fund.data.meta.scheme_name}
            </span>
            <button
              onClick={() => handleRemove(fund.id)}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg font-medium shadow hover:bg-red-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}
