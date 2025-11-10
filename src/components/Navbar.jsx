



// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { toast } from '../utils/toast';
// import { useState, useEffect, useRef } from 'react';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef();

//   const handleLogout = async () => {
//     await logout();
//     toast('success', 'Logged out');
//     navigate('/');
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur sticky top-0 z-30">
//       <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
//           <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">CC</span>
//           Clean City
//         </Link>

//         <ul className="flex items-center gap-4 text-sm">
//           <li>
//             <NavLink
//               to="/"
//               className={({ isActive }) => isActive ? 'text-emerald-600 font-semibold' : ''}
//             >
//               Home
//             </NavLink>
//           </li>

//           {!user && (
//             <>
//               <li><NavLink to="/issues">Issues</NavLink></li>
//               <li><NavLink to="/login">Login</NavLink></li>
//               <li><NavLink to="/register">Register</NavLink></li>
//             </>
//           )}

//           {user && (
//             <>
//               <li><NavLink to="/issues">All Issues</NavLink></li>
//               <li><NavLink to="/add-issue">Add Issues</NavLink></li>
//               <li><NavLink to="/my-issues">My Issues</NavLink></li>
//               <li><NavLink to="/my-contributions">My Contribution</NavLink></li>

//               {/* Profile Dropdown */}
//               <li className="relative" ref={menuRef}>
//                 <img
//                   src={user.photoURL || `https://i.pravatar.cc/40?u=${user.email}`}
//                   alt="avatar"
//                   className="h-8 w-8 rounded-full border cursor-pointer"
//                   onClick={() => setOpen(!open)}
//                 />
//                 {open && (
//                   <div className="absolute right-0 mt-2">
//                     <div className="card min-w-[160px] shadow-lg">
//                       <Link
//                         to="/profile"
//                         onClick={() => setOpen(false)}
//                         className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
//                       >
//                         Profile
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="btn btn-outline w-full mt-2"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }




// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { toast } from '../utils/toast';
// import { useState, useEffect, useRef } from 'react';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
  
//   // 'open' state টি আপনার প্রোফাইল ড্রপডাউনের জন্য (ডেক্সটপ)
//   const [open, setOpen] = useState(false);
  
//   // 'isMobileMenuOpen' state টি মোবাইল হ্যামবার্গার মেনুর জন্য
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   const menuRef = useRef();

//   const handleLogout = async () => {
//     // মেনু বন্ধ করুন (যদি খোলা থাকে)
//     setOpen(false);
//     setIsMobileMenuOpen(false);
    
//     await logout();
//     toast('success', 'Logged out');
//     navigate('/');
//   };

//   // Close dropdown if clicked outside (আপনার এই লজিকটি ঠিকই আছে)
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // হেল্পার ফাংশন: অ্যাক্টিভ লিংকের স্টাইল
//   const getLinkClass = ({ isActive }) => 
//     isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600';

//   // হেল্পার ফাংশন: মোবাইল মেনুর অ্যাক্টিভ স্টাইল
//   const getMobileLinkClass = ({ isActive }) =>
//     isActive 
//       ? 'block w-full px-4 py-2 rounded bg-emerald-50 text-emerald-700 font-semibold'
//       : 'block w-full px-4 py-2 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';


//   return (
//     <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur sticky top-0 z-30">
//       <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        
//         {/* লোগো (আপনার কোড) */}
//         <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
//           <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">CC</span>
//           Clean City
//         </Link>

//         {/* ডেক্সটপ মেনু (বড় স্ক্রিনে দেখাবে) */}
//         <ul className="hidden md:flex items-center gap-4 text-sm"> {/* <-- 'hidden md:flex' যোগ করা হয়েছে */}
//           <li>
//             <NavLink to="/" className={getLinkClass}>
//               Home
//             </NavLink>
//           </li>

//           {!user && (
//             <>
//               <li><NavLink to="/issues" className={getLinkClass}>Issues</NavLink></li>
//               <li><NavLink to="/login" className={getLinkClass}>Login</NavLink></li>
//               <li><NavLink to="/register" className={getLinkClass}>Register</NavLink></li>
//             </>
//           )}

//           {user && (
//             <>
//               <li><NavLink to="/issues" className={getLinkClass}>All Issues</NavLink></li>
//               <li><NavLink to="/add-issue" className={getLinkClass}>Add Issues</NavLink></li>
//               <li><NavLink to="/my-issues" className={getLinkClass}>My Issues</NavLink></li>
//               <li><NavLink to="/my-contributions" className={getLinkClass}>My Contribution</NavLink></li>

//               {/* প্রোফাইল ড্রপডাউন (আপনার কোড) */}
//               <li className="relative" ref={menuRef}>
//                 <img
//                   src={user.photoURL || `https://i.pravatar.cc/40?u=${user.email}`}
//                   alt="avatar"
//                   className="h-8 w-8 rounded-full border cursor-pointer"
//                   onClick={() => setOpen(!open)}
//                 />
//                 {open && (
//                   <div className="absolute right-0 mt-2">
//                     <div className="card min-w-[160px] shadow-lg">
//                       <Link
//                         to="/profile"
//                         onClick={() => setOpen(false)}
//                         className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
//                       >
//                         Profile
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="btn btn-outline w-full mt-2"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </li>
//             </>
//           )}
//         </ul>
        
//         {/* হ্যামবার্গার বাটন (শুধু ছোট স্ক্রিনে দেখাবে) */}
//         <div className="md:hidden"> {/* <-- 'md:hidden' যোগ করা হয়েছে */}
//           <button 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="text-slate-700 dark:text-slate-200 hover:text-emerald-600"
//           >
//             {isMobileMenuOpen ? (
//               // 'X' আইকন (যখন মেনু খোলা)
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               // 'Menu' আইকন (যখন মেনু বন্ধ)
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </nav>

//       {/* মোবাইল মেনু ড্রপডাউন (শুধু ছোট স্ক্রিনে দেখাবে) */}
//       <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
//         <ul className="flex flex-col gap-1 text-sm p-4 border-t border-slate-200 dark:border-slate-800">
//           <li>
//             <NavLink to="/" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
//               Home
//             </NavLink>
//           </li>

//           {!user && (
//             <>
//               <li><NavLink to="/issues" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Issues</NavLink></li>
//               <li><NavLink to="/login" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink></li>
//               <li><NavLink to="/register" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Register</NavLink></li>
//             </>
//           )}

//           {user && (
//             <>
//               <li><NavLink to="/issues" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>All Issues</NavLink></li>
//               <li><NavLink to="/add-issue" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Add Issues</NavLink></li>
//               <li><NavLink to="/my-issues" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>My Issues</NavLink></li>
//               <li><NavLink to="/my-contributions" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>My Contribution</NavLink></li>
              
//               <li className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
//                 <NavLink 
//                   to="/profile" 
//                   className={getMobileLinkClass} 
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <div className="flex items-center gap-2">
//                     <img
//                       src={user.photoURL || `https://i.pravatar.cc/40?u=${user.email}`}
//                       alt="avatar"
//                       className="h-7 w-7 rounded-full border"
//                     />
//                     <span>Profile</span>
//                   </div>
//                 </NavLink>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLogout} // এই ফাংশনটি মেনু বন্ধ করাসহ লগআউট করে
//                   className="btn btn-outline w-full mt-2"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </header>
//   );
// }



// src/components/Navbar.jsx

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../utils/toast';
import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle'; // <-- ১. ইম্পোর্ট করা হয়েছে

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuRef = useRef();

  const handleLogout = async () => {
    setOpen(false);
    setIsMobileMenuOpen(false);
    
    await logout();
    toast('success', 'Logged out');
    navigate('/');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // হেল্পার ফাংশন: অ্যাক্টিভ লিংকের স্টাইল
  const getLinkClass = ({ isActive }) => 
    isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600';

  // হেল্পার ফাংশন: মোবাইল মেনুর অ্যাক্টিভ স্টাইল
  const getMobileLinkClass = ({ isActive }) =>
    isActive 
      ? 'block w-full px-4 py-2 rounded bg-emerald-50 text-emerald-700 font-semibold'
      : 'block w-full px-4 py-2 rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';


  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-950/60 backdrop-blur sticky top-0 z-30">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* লোগো */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">CC</span>
          Clean City
        </Link>

        {/* ডেক্সটপ মেনু (বড় স্ক্রিনে দেখাবে) */}
        <ul className="hidden md:flex items-center gap-4 text-sm">
          <li>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
          </li>

          {!user && (
            <>
              <li><NavLink to="/issues" className={getLinkClass}>Issues</NavLink></li>
              <li><NavLink to="/login" className={getLinkClass}>Login</NavLink></li>
              <li><NavLink to="/register" className={getLinkClass}>Register</NavLink></li>
            </>
          )}

          {user && (
            <>
              <li><NavLink to="/issues" className={getLinkClass}>All Issues</NavLink></li>
              <li><NavLink to="/add-issue" className={getLinkClass}>Add Issues</NavLink></li>
              <li><NavLink to="/my-issues" className={getLinkClass}>My Issues</NavLink></li>
              <li><NavLink to="/my-contributions" className={getLinkClass}>My Contribution</NavLink></li>

              {/* প্রোফাইল ড্রপডাউন */}
              <li className="relative" ref={menuRef}>
                <img
                  src={user.photoURL || `https://i.pravatar.cc/40?u=${user.email}`}
                  alt="avatar"
                  className="h-8 w-8 rounded-full border cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
                {open && (
                  <div className="absolute right-0 mt-2">
                    <div className="card min-w-[160px] shadow-lg">
                      <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline w-full mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </li>
            </>
          )}

          {/* <-- ২. থিম টগল (ডেক্সটপ) যোগ করা হয়েছে --> */}
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>
        
        
        <div className="md:hidden flex items-center gap-2">
          
          {/* <ThemeToggle /> */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-700 dark:text-slate-200 hover:text-emerald-600"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* মোবাইল মেনু ড্রপডাউন */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col gap-1 text-sm p-4 border-t border-slate-200 dark:border-slate-800">
          <li>
            <NavLink to="/" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          {!user && (
            <>
              <li><NavLink to="/issues" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Issues</NavLink></li>
              <li><NavLink to="/login" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink></li>
              <li><NavLink to="/register" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Register</NavLink></li>
            </>
          )}

          {user && (
            <>
              <li><NavLink to="/issues" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>All Issues</NavLink></li>
              <li><NavLink to="/add-issue" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Add Issues</NavLink></li>
              <li><NavLink to="/my-issues" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>My Issues</NavLink></li>
              <li><NavLink to="/my-contributions" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>My Contribution</NavLink></li>
              
              <li className="border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
                <NavLink 
                  to="/profile" 
                  className={getMobileLinkClass} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.photoURL || `https://i.pravatar.cc/40?u=${user.email}`}
                      alt="avatar"
                      className="h-7 w-7 rounded-full border"
                    />
                    <span>Profile</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline w-full mt-2"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* <-- ৩. থিম টগল (মোবাইল) যোগ করা হয়েছে --> */}
          <li className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="w-full">
              <ThemeToggle />
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}