

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Spinner from '../components/Spinner';

export default function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ categoryData: [], statusData: [], userStats: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/stats/dashboard')
      .then(res => {
        setStats(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  if (loading) return <Spinner />;

  return (
    <div>
      <Helmet><title>Dashboard — Clean City</title></Helmet>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome back, {user?.displayName?.split(' ')[0]}! 👋</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here is what's happening with your contributions and reports.</p>
      </div>
      
      {/* পরিসংখ্যান কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="card bg-white dark:bg-slate-800 shadow-sm border-l-4 border-emerald-500 p-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Reports</div>
                    <div className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">{stats.statusData.reduce((acc, curr) => acc + curr.count, 0)}</div>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                </div>
            </div>
         </div>

         <div className="card bg-white dark:bg-slate-800 shadow-sm border-l-4 border-blue-500 p-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">My Reports</div>
                    <div className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">{stats.userStats?.myIssuesCount || 0}</div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                </div>
            </div>
         </div>

         <div className="card bg-white dark:bg-slate-800 shadow-sm border-l-4 border-amber-500 p-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">My Contributions</div>
                    <div className="text-4xl font-bold mt-2 text-slate-800 dark:text-white">{stats.userStats?.myContribs || 0}</div>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                </div>
            </div>
         </div>
      </div>

      {/* চার্ট সেকশন */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Pie Chart */}
        <div className="card bg-white dark:bg-slate-800 shadow-sm p-6">
          <h3 className="font-semibold mb-6 text-center text-lg">Issue Categories Distribution</h3>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="_id"
                >
                  {stats.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="card bg-white dark:bg-slate-800 shadow-sm p-6">
          <h3 className="font-semibold mb-6 text-center text-lg">Issue Status Overview</h3>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.statusData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="_id" />
                <YAxis allowDecimals={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="count" fill="#10b981" radius={[10, 10, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}