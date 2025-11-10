

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Helmet } from 'react-helmet-async';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Helmet><title>Clean City Portal</title></Helmet>
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </div>
      <Footer />
      
    </div>
  );
}
