// export default function Footer() {
//   return (
//     <footer className="mt-10 border-t border-slate-200 dark:border-slate-800">
//       <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
//         <div>
//           <div className="flex items-center gap-2 font-extrabold text-lg mb-2">
//             <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white">CC</span>
//             Clean City
//           </div>
//           <p className="text-sm opacity-80">Report issues, rally neighbors, and keep your community clean and safe.</p>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2">Useful Links</h4>
//           <ul className="text-sm space-y-1">
//             <li><a href="/issues">All Issues</a></li>
//             <li><a href="/add-issue">Add Issue</a></li>
//             <li><a href="/my-issues">My Issues</a></li>
//             <li><a href="/my-contributions">My Contribution</a></li>
//           </ul>
//         </div>
//         <div className="text-sm opacity-80">
//           <p>© 2025 Clean City — All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }








export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-slate-200/70 dark:border-slate-800/70">
      {/* subtle top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:gap-12 lg:gap-16 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-extrabold text-lg mb-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">CC</span>
              <span className="leading-none">Clean City</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Report issues, rally neighbors, and keep your community clean and safe.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Follow on Twitter"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 transition"
              >
                {/* Twitter/X icon */}
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-slate-600 group-hover:fill-emerald-600 dark:fill-slate-400 transition">
                  <path d="M18.244 2.25h3.154l-6.89 7.87 8.09 11.63H16.39l-5.03-6.58-5.75 6.58H2.45l7.37-8.43L2 2.25h6.02l4.56 6.02 5.66-6.02Zm-2.76 18.09h1.75L8.6 4.72H6.73l8.754 15.62Z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Follow on GitHub"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 transition"
              >
                {/* GitHub icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-slate-600 group-hover:fill-emerald-600 dark:fill-slate-400 transition">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.8-.25.8-.56 0-.27-.01-1.15-.02-2.09-3.26.71-3.95-1.4-3.95-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.71.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.11-.77.41-1.27.74-1.56-2.6-.3-5.35-1.3-5.35-5.8 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.2a11.1 11.1 0 0 1 5.84 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.65.23 2.87.11 3.17.75.82 1.2 1.86 1.2 3.14 0 4.51-2.75 5.5-5.36 5.79.42.37.79 1.11.79 2.23 0 1.6-.02 2.89-.02 3.28 0 .31.22.67.81.56A11.5 11.5 0 0 0 12 .5Z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Join our community"
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 dark:border-slate-800/70 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 transition"
              >
                {/* Globe icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-slate-600 group-hover:stroke-emerald-600 dark:stroke-slate-400 transition" fill="none">
                  <circle cx="12" cy="12" r="9" strokeWidth="1.6"/>
                  <path d="M3 12h18M12 3c3 3.8 3 13.2 0 18M12 3c-3 3.8-3 13.2 0 18" strokeWidth="1.6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Useful Links (same routes you had) */}
          <div>
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Useful Links</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/issues" className="group inline-flex items-center gap-2 hover:text-emerald-600 transition">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-emerald-500" />
                  All Issues
                </a>
              </li>
              <li>
                <a href="/add-issue" className="group inline-flex items-center gap-2 hover:text-emerald-600 transition">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-emerald-500" />
                  Add Issue
                </a>
              </li>
              <li>
                <a href="/my-issues" className="group inline-flex items-center gap-2 hover:text-emerald-600 transition">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-emerald-500" />
                  My Issues
                </a>
              </li>
              <li>
                <a href="/my-contributions" className="group inline-flex items-center gap-2 hover:text-emerald-600 transition">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-emerald-500" />
                  My Contribution
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Stay in the loop</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Get updates about local cleanups, issue resolution, and new features.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // এখানে তোমার সাবমিট লজিক বসাতে পারো
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="submit"
                className="rounded-xl px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>

          {/* Legal / Contact */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Contact</h4>
            <ul className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              <li><a className="hover:text-emerald-600 transition" href="mailto:support@cleancity.app">support@cleancity.app</a></li>
              <li>123 Community Lane, Dhaka</li>
              <li className="opacity-80">Open-source friendly ♻️</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-3 border-t border-slate-200/60 dark:border-slate-800/60 pt-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {year} <span className="font-semibold text-slate-900 dark:text-slate-100">Clean City</span> — All rights reserved.
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Made with <span className="mx-0.5">💚</span> for cleaner neighborhoods
          </div>
        </div>
      </div>
    </footer>
  );
}
