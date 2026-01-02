



import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './hooks/useAuth'; 
import router from './router';
import './styles/global.css';

// --- ফিক্স: সব ধরণের জেদি ওয়ার্নিং এবং Recharts এরর হাইড করার স্ক্রিপ্ট ---
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  const msg = args[0];
  // Recharts, React Router এবং Google Auth এর ওয়ার্নিং ইগনোর করা
  if (typeof msg === 'string' && (
      msg.includes('ResizeObserver') || 
      msg.includes('future') || 
      msg.includes('React Router') ||
      msg.includes('Cross-Origin-Opener-Policy')
  )) return;
  originalWarn.apply(console, args);
};

console.error = (...args) => {
  const msg = args[0];
  
  if (typeof msg === 'string' && (
      msg.includes('ResizeObserver') || 
      msg.includes('defaultProps') ||
      msg.includes('width(-1) and height(-1)') 
  )) return;
  originalError.apply(console, args);
};

// উইন্ডো লেভেলের এরর হ্যান্ডলার
window.addEventListener('error', (e) => {
  if (e.message && (
      e.message.includes('ResizeObserver') ||
      e.message.includes('Cross-Origin-Opener-Policy')
  )) {
    e.stopImmediatePropagation();
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </HelmetProvider>
);