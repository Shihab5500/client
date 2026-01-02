

import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { toast } from '../utils/toast';

export default function Footer() {
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast('success', 'Thank you for subscribing!');
    e.target.reset();
  };

  return (
    <footer className="relative mt-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-blue-500 opacity-80"></div>

      <div className="container mx-auto px-6 py-16">
        <Fade cascade damping={0.1} triggerOnce>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Brand Section */}
            <div>
              <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-emerald-600 mb-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">CC</span>
                Clean City
              </Link>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                Empowering communities to build cleaner, safer, and smarter neighborhoods together. Join the movement today!
              </p>
              
              {/* Social Icons (SVG Fixed) */}
              <div className="flex gap-4">
                {/* Facebook */}
                <a href="#" className="social-btn group">
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733 1.055-2.733 2.697v1.274h3.906l-.371 3.667h-3.535v7.98h-5.08z"/></svg>
                </a>
                
                {/* Twitter / X */}
                <a href="#" className="social-btn group">
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className="social-btn group">
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </a>

                {/* GitHub */}
                <a href="#" className="social-btn group">
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-800 dark:text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="footer-link">› Home</Link></li>
                <li><Link to="/issues" className="footer-link">› All Reports</Link></li>
                <li><Link to="/dashboard" className="footer-link">› Dashboard</Link></li>
                <li><Link to="/login" className="footer-link">› Login / Register</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-800 dark:text-white">Support</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                  <span className="mt-1 text-emerald-600">📍</span>
                  <span>123 Green Way, Dhaka, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="text-emerald-600">📧</span>
                  <a href="mailto:support@cleancity.app" className="hover:text-emerald-600 transition">support@cleancity.app</a>
                </li>
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="text-emerald-600">📞</span>
                  <span>+880 1700 000000</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-slate-800 dark:text-white">Stay Updated</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Subscribe to get the latest updates on city cleanups and events.
              </p>
              <form onSubmit={handleSubscribe} className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white pr-12 transition-all"
                  required 
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 rounded-lg transition-colors shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </Fade>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            © {year} <span className="font-semibold text-emerald-600">Clean City</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-emerald-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Styles for repeated classes */}
      <style>{`
        .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            background-color: #f1f5f9; /* slate-100 */
            color: #475569; /* slate-600 */
            transition: all 0.3s;
        }
        .dark .social-btn {
            background-color: #1e293b; /* slate-800 */
            color: #cbd5e1; /* slate-300 */
        }
        .social-btn:hover {
            background-color: #059669; /* emerald-600 */
            color: white;
            box-shadow: 0 4px 6px -1px rgba(5, 150, 105, 0.4);
            transform: translateY(-2px);
        }
        .footer-link {
            color: #475569;
            transition: color 0.2s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .dark .footer-link {
            color: #94a3b8;
        }
        .footer-link:hover {
            color: #059669;
        }
        .dark .footer-link:hover {
            color: #34d399;
        }
      `}</style>
    </footer>
  );
}