import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MFAPI from '../apiMF';
import API from '../api';

export default function FundDetail() {
  const { id } = useParams();
  const [fund, setFund] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFund = async () => {
      try {
        const res = await MFAPI.get(`/mf/${id}`);
        setFund(res.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching fund details');
      }
      setLoading(false);
    };
    fetchFund();
  }, [id]);

  const handleSave = async () => {
    try {
      await API.post('/funds/save', { fundId: id });
      alert('Fund saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving fund (maybe not logged in)');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );

  if (!fund)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Fund not found</p>
      </div>
    );

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-400 flex justify-center items-start py-16 px-4">
    <div className="bg-white/90 rounded-2xl shadow-2xl p-10 w-full max-w-2xl flex flex-col space-y-8 border border-slate-200">
      <h1 className="text-3xl font-bold text-gray-800 text-center tracking-tight drop-shadow-sm">
        {fund.meta.scheme_name}
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between gap-6 text-gray-700 bg-slate-50 rounded-lg p-6 border border-slate-100 shadow-sm">
        <div>
          <p className="mb-2"><span className="font-semibold text-slate-700">Fund Code:</span> <span className="font-mono">{id}</span></p>
          <p className="mb-2"><span className="font-semibold text-slate-700">AMC:</span> {fund.meta.fund_house}</p>
          <p><span className="font-semibold text-slate-700">Category:</span> {fund.meta.scheme_category}</p>
        </div>
        <div className="flex flex-col gap-3 min-w-[180px]">
          <button
            onClick={handleSave}
            className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Save this fund
          </button>
          <button
            onClick={() => navigate('/saved')}
            className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            View Saved Funds
          </button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent NAVs</h2>
        <ul className="space-y-3">
          {fund.data.slice(0, 5).map((nav, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200 text-gray-700 shadow-sm hover:bg-slate-100 transition"
            >
              <span className="font-medium">{nav.date}</span>
              <span className="font-mono text-green-700 text-lg">₹ {nav.nav}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
}
