import { Helmet } from 'react-helmet-async';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../hooks/useAuth';

function Inner() {
  const { user } = useAuth();
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center shadow-lg">
        
        
        <div className="w-24 h-24 mx-auto rounded-full p-1 border-2 border-emerald-500 mb-4">
            <img 
                className="w-full h-full rounded-full object-cover" 
                src={user.photoURL || `https://i.pravatar.cc/150?u=${user.email}`} 
                alt="Profile"
            />
        </div>

        
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
            {user.displayName || 'Anonymous User'}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
            {user.email}
        </p>

        
        <div className="flex justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
                Verified Citizen
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
                Active Reporter
            </span>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <>
      <Helmet><title>My Profile — Clean City</title></Helmet>
      <PrivateRoute><Inner/></PrivateRoute>
    </>
  );
}