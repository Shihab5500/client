// import { useEffect, useState } from 'react';
// export default function ThemeToggle() {
//   const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
//   useEffect(() => {
//     if (dark) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
//     else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
//   }, [dark]);
//   return (<button className="btn btn-outline" onClick={() => setDark(d => !d)}>{dark? 'Light' : 'Dark'} Mode</button>);
// }


// src/components/ThemeToggle.jsx

import { useEffect, useState } from 'react';

// localStorage থেকে থিম পড়ার জন্য একটি হেল্পার ফাংশন
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') === 'dark';
  }
  return false; // ডিফল্ট (লাইট মোড)
};

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  // ১. এই ইফেক্টটি state পরিবর্তন হলে localStorage ও <html> ট্যাগ আপডেট করে
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);


  // ২. !! নতুন সমাধান !!
  // এই ইফেক্টটি localStorage-এর পরিবর্তন শোনে (listen)
  // অন্য বাটন (বা অন্য ট্যাব) থিম পরিবর্তন করলেও এটি আপডেট হবে
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setDark(e.newValue === 'dark');
      }
    };

    // 'storage' ইভেন্ট লিসেনার যোগ করা
    window.addEventListener('storage', handleStorageChange);

    // কম্পোনেন্টটি আনমাউন্ট হলে লিসেনার রিমুভ করা
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // [] মানে এটি শুধু একবারই রান হবে

  // onClick ফাংশনটি state পরিবর্তন করে, যা উপরের ১ নম্বর ইফেক্টটি চালু করে
  return (
    <button 
      className="btn btn-outline w-full" 
      onClick={() => setDark(d => !d)}
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}