

import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from '../components/ThemeToggle';
import { toast } from '../utils/toast';
import { useState } from 'react';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setMobileOpen] = useState(false);

  
  const isAdmin = user?.email === 'demo@admin.com';

  const handleLogout = async () => {
    await logout();
    toast('success', 'Logged out successfully');
    navigate('/');
  };

  const menuItems = (
    <>
      <li className="mb-1">
        <NavLink 
            to="/dashboard" 
            end 
            onClick={() => setMobileOpen(false)}
            className={({isActive}) => isActive 
                ? "bg-emerald-600 text-white font-medium block px-4 py-2 rounded-lg transition-colors" 
                : "font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"}
        >
          📊 Dashboard Home
        </NavLink>
      </li>

      
      {isAdmin ? (
         // ADMIN MENU
         <>
            <li className="mb-1">
                <NavLink 
                    to="/dashboard/manage-issues" 
                    onClick={() => setMobileOpen(false)}
                    className={({isActive}) => isActive 
                        ? "bg-emerald-600 text-white font-medium block px-4 py-2 rounded-lg transition-colors" 
                        : "font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"}
                >
                🛡️ Manage All Issues
                </NavLink>
            </li>
         </>
      ) : (
         // USER MENU
         <>
            <li className="mb-1">
                <NavLink 
                    to="/dashboard/my-issues" 
                    onClick={() => setMobileOpen(false)}
                    className={({isActive}) => isActive 
                        ? "bg-emerald-600 text-white font-medium block px-4 py-2 rounded-lg transition-colors" 
                        : "font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"}
                >
                📝 My Issues
                </NavLink>
            </li>
            <li className="mb-1">
                <NavLink 
                    to="/dashboard/add-issue" 
                    onClick={() => setMobileOpen(false)}
                    className={({isActive}) => isActive 
                        ? "bg-emerald-600 text-white font-medium block px-4 py-2 rounded-lg transition-colors" 
                        : "font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"}
                >
                ➕ Add New Issue
                </NavLink>
            </li>
            <li className="mb-1">
                <NavLink 
                    to="/dashboard/my-contributions" 
                    onClick={() => setMobileOpen(false)}
                    className={({isActive}) => isActive 
                        ? "bg-emerald-600 text-white font-medium block px-4 py-2 rounded-lg transition-colors" 
                        : "font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"}
                >
                💰 My Contributions
                </NavLink>
            </li>
         </>
      )}
      
      <li className="mb-1">
        <NavLink 
            to="/dashboard/profile" 
            onClick={() => setMobileOpen(false)}
            className={({isActive}) => isActive 
                ? "bg-emerald-600 text-white font-medium block px-4 py-2 rounded-lg transition-colors" 
                : "font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"}
        >
          👤 My Profile
        </NavLink>
      </li>
      
      <div className="my-4 border-t border-slate-200 dark:border-slate-700"></div>
      
      <li>
        <Link to="/" className="font-medium block px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            🏠 Back to Home
        </Link>
      </li>
      <li>
        <button onClick={handleLogout} className="w-full text-left font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 block px-4 py-2 rounded-lg transition-colors">
            🚪 Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-900 dark:text-slate-100">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden lg:flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 shadow-sm z-30">
        <div className="p-6 flex flex-col items-center border-b border-slate-200 dark:border-slate-800">
             <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-emerald-600">
               <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">CC</span>
               Clean City
            </Link>
             <div className="mt-6 text-center w-full">
                <div className="w-20 h-20 mx-auto rounded-full p-1 border-2 border-emerald-500">
                    <img src={user?.photoURL || "https://i.pravatar.cc/150"} className="w-full h-full rounded-full object-cover" alt="User" />
                </div>
                <h3 className="font-bold mt-3 text-lg truncate px-2 text-slate-800 dark:text-white">{user?.displayName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
                </p>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
           <ThemeToggle />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-slate-900">
        
        {/* Mobile Header */}
        <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between lg:hidden z-20 shadow-sm">
             <div className="font-bold text-lg text-emerald-600 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-sm">CC</span>
                Clean City
             </div>
             <button onClick={() => setMobileOpen(true)} className="btn btn-square btn-ghost btn-sm text-slate-700 dark:text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
             </button>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
           <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
             onClick={() => setMobileOpen(false)}
           ></div>
           
           <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-950 p-4 shadow-2xl overflow-y-auto border-r border-slate-200 dark:border-slate-800 transition-transform duration-300">
              <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-xl text-slate-800 dark:text-white">Menu</span>
                  <button onClick={() => setMobileOpen(false)} className="btn btn-circle btn-sm btn-ghost text-slate-600 dark:text-slate-300">✕</button>
              </div>
              <ul className="space-y-1">
                 {menuItems}
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <ThemeToggle />
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
