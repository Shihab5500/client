

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

  //  এই ইফেক্টটি state পরিবর্তন হলে localStorage ও <html> ট্যাগ আপডেট করে
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);


  
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setDark(e.newValue === 'dark');
      }
    };

    // storage ইভেন্ট লিসেনার যোগ করা
    window.addEventListener('storage', handleStorageChange);

    // কম্পোনেন্টটি আনমাউন্ট হলে লিসেনার রিমুভ করা
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); //  মানে এটি শুধু একবারই রান হবে

  // onClick ফাংশনটি state পরিবর্তন করে যা উপরের ১ নম্বর ইফেক্টটি চালু করে
  return (
    <button 
      className="btn btn-outline w-full" 
      onClick={() => setDark(d => !d)}
    >
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}