import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getRecentIssues, getStats } from '../services/issues';
import IssueCard from '../components/IssueCard';
import { Fade } from 'react-awesome-reveal';

export default function Home() {
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      setRecent(await getRecentIssues());
      setStats(await getStats());
    })();
  }, []);

  return (
    <div>
      <Helmet><title>Home — Clean City</title></Helmet>

      {/* Banner */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop', t: 'Report garbage buildup fast' },
          { img: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1200&auto=format&fit=crop', t: 'Join neighborhood clean drives' },
          { img: 'https://images.unsplash.com/photo-1530639834082-05bafb67fbbe?q=80&w=1200&auto=format&fit=crop', t: 'Track progress & contributions' }
        ].map((b, i) => (
          <div key={i} className="relative h-56 md:h-64 rounded-2xl overflow-hidden">
            <img src={b.img} alt="banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-3 left-3 text-white font-semibold text-lg">{b.t}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-3">Categories</h2>
        <div className="grid-3">
          {['Garbage', 'Illegal Construction', 'Broken Public Property', 'Road Damage'].map(c => (
            <div key={c} className="card flex items-center justify-between">
              <span className="font-semibold">{c}</span>
              <span className="text-xs opacity-70">Tap All Issues → filter</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Complaints</h2>
          <a href="/issues" className="text-emerald-600">See all</a>
        </div>
        <div className="grid-3 mt-3">
          {recent.map(item => <IssueCard key={item._id} issue={item} />)}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-lg">Community Stats</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 text-center">
            <div className="card"><div className="text-2xl font-bold">{stats?.users || 0}</div><div className="text-xs opacity-70">Registered Users</div></div>
            <div className="card"><div className="text-2xl font-bold">{stats?.totalIssues || 0}</div><div className="text-xs opacity-70">Total Issues</div></div>
            <div className="card"><div className="text-2xl font-bold">{stats?.resolved || 0}</div><div className="text-xs opacity-70">Resolved</div></div>
            <div className="card"><div className="text-2xl font-bold">{stats?.pending || 0}</div><div className="text-xs opacity-70">Pending</div></div>
          </div>
        </div>
        <Fade>
          <div className="card flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Volunteer for a Clean Drive</h3>
              <p className="text-sm opacity-80 mt-1">Bring gloves, energy, and neighbors. We’ll send locations & times via email.</p>
              <a href="/issues" className="btn btn-primary mt-3">Join Now</a>
            </div>
            {/* Static image instead of Lottie to avoid 403 */}
            <div className="w-40 h-40">
              <img
                src="https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=400&auto=format&fit=crop"
                alt="clean drive"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </Fade>
      </section>
    </div>
  );
}
