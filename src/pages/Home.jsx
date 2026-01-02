


import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentIssues, getStats } from '../services/issues';
import IssueCard from '../components/IssueCard';
import Spinner from '../components/Spinner';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

export default function Home() {
  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ১. হিরো স্লাইডার ডাটা
  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1920&auto=format&fit=crop',
      title: 'Make Your City Cleaner, Together.',
      desc: 'Report garbage, illegal construction, or road damage instantly. We connect you with authorities.'
    },
    {
      img: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1920&auto=format&fit=crop',
      title: 'Join Neighborhood Clean Drives.',
      desc: 'Volunteer for community events and make a visible difference in your local area.'
    },
    {
      img: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=1920&auto=format&fit=crop',
      title: 'Track Progress & Impact.',
      desc: 'See real-time updates on reported issues and watch your contribution score grow.'
    }
  ];

  // অটো স্লাইডার লজিক
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // ডাটা ফেচিং
  useEffect(() => {
    (async () => {
      try {
        const [recentRes, statsRes] = await Promise.all([getRecentIssues(), getStats()]);
        setRecent(recentRes);
        setStats(statsRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;

  return (
    <div className="space-y-16 pb-10">
      <Helmet><title>Home — Clean City</title></Helmet>

      {/* SECTION 1: Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-xl group">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.img} alt="hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-center p-6">
              <Fade direction="up" cascade damping={0.1} key={currentSlide}>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-md max-w-4xl">{s.title}</h1>
                <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl">{s.desc}</p>
                <div className="flex gap-4">
                   <Link to="/issues" className="btn btn-primary px-8 py-3 text-lg border-none">Explore Issues</Link>
                   <Link to="/add-issue" className="btn bg-white text-emerald-700 hover:bg-slate-100 px-8 py-3 text-lg border-none">Report Now</Link>
                </div>
              </Fade>
            </div>
          </div>
        ))}
        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 w-8 rounded-full transition-all ${i === currentSlide ? 'bg-emerald-500 w-12' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: Community Stats */}
      <section className="container mx-auto">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Our Impact So Far</h2>
            <p className="text-slate-500 dark:text-slate-400">Numbers that show our community's dedication</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Registered Users', val: stats?.users || 120, icon: '👥' },
            { label: 'Issues Reported', val: stats?.totalIssues || 0, icon: '📝' },
            { label: 'Issues Resolved', val: stats?.resolved || 0, icon: '✅' },
            { label: 'Funds Raised', val: `৳${stats?.totalRaised || 0}`, icon: '💰' }
          ].map((stat, idx) => (
            <div key={idx} className="card text-center p-6 hover:-translate-y-1 transition duration-300 border-b-4 border-emerald-500">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{stat.val}</div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Categories */}
      <section>
        <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-3xl font-bold">Browse by Category</h2>
                <p className="text-slate-500 dark:text-slate-400">Find issues that matter to you</p>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Garbage', bg: 'bg-red-100 text-red-700', img: '🗑️' },
            { name: 'Illegal Construction', bg: 'bg-orange-100 text-orange-700', img: '🚧' },
            { name: 'Broken Public Property', bg: 'bg-blue-100 text-blue-700', img: '🏚️' },
            { name: 'Road Damage', bg: 'bg-slate-200 text-slate-700', img: '🛣️' }
          ].map((c) => (
            <Link key={c.name} to={`/issues?category=${c.name}`} className="card flex flex-col items-center justify-center p-8 hover:shadow-lg transition cursor-pointer group">
              <span className="text-5xl mb-4 group-hover:scale-110 transition duration-300">{c.img}</span>
              <h3 className="font-bold text-lg text-center">{c.name}</h3>
              <span className="text-xs mt-2 opacity-60">View Issues →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: Recent Issues */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
              <h2 className="text-3xl font-bold">Recent Reports</h2>
              <p className="text-slate-500 dark:text-slate-400">Latest issues reported by neighbors</p>
          </div>
          <Link to="/issues" className="btn btn-outline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Fade cascade damping={0.1}>
            {recent.map(item => <IssueCard key={item._id} issue={item} />)}
          </Fade>
        </div>
      </section>

      {/* SECTION 5: How It Works */}
      <section className="bg-emerald-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400">Simple steps to make a big change</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { step: '01', title: 'Snap & Report', desc: 'Take a photo of the issue, add location details, and upload it.', icon: '📸' },
                { step: '02', title: 'Connect & Verify', desc: 'Authorities and neighbors verify the issue. Status updates live.', icon: '🤝' },
                { step: '03', title: 'Resolve & Celebrate', desc: 'Issue gets fixed, you get points, and the city gets cleaner!', icon: '🎉' }
            ].map((s, i) => (
                <div key={i} className="relative p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                        {s.step}
                    </div>
                    <div className="mt-4 text-4xl mb-4 text-center">{s.icon}</div>
                    <h3 className="text-xl font-bold text-center mb-2">{s.title}</h3>
                    <p className="text-center text-slate-500 dark:text-slate-400 text-sm">{s.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* SECTION 6: Success Stories / Testimonials */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Voices of Change</h2>
        <div className="grid md:grid-cols-3 gap-6">
            {[
                { name: 'Rahim Ahmed', role: 'Local Volunteer', quote: 'Clean City app made it so easy to organize our weekend cleanup. We removed 50kg of waste!', img: 'https://i.pravatar.cc/100?img=11' },
                { name: 'Fatima Begum', role: 'Community Leader', quote: 'Finally, a transparent way to report broken roads. The authority responded within 3 days.', img: 'https://i.pravatar.cc/100?img=5' },
                { name: 'John Doe', role: 'Student', quote: 'I love earning badges for my reports. It feels good to contribute to my own neighborhood.', img: 'https://i.pravatar.cc/100?img=13' },
            ].map((t, i) => (
                <div key={i} className="card p-6 flex flex-col items-center text-center">
                    <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-emerald-500" />
                    <p className="italic text-slate-600 dark:text-slate-300 mb-4">"{t.quote}"</p>
                    <h4 className="font-bold">{t.name}</h4>
                    <span className="text-xs text-emerald-600 font-medium">{t.role}</span>
                </div>
            ))}
        </div>
      </section>

      {/* SECTION 7: Upcoming Events */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <Zoom triggerOnce>
            <div className="rounded-2xl overflow-hidden h-80">
                <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition duration-500" alt="event" />
            </div>
        </Zoom>
        <div>
            <span className="text-emerald-600 font-bold tracking-wider text-sm">UPCOMING EVENT</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-4">Grand City Cleanup 2024</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Join over 500+ volunteers this Friday at Central Park. We are providing gloves, bags, and refreshments. Let's make history together!
            </p>
            <div className="flex gap-6 mb-6">
                <div>
                    <div className="font-bold text-2xl">25</div>
                    <div className="text-xs uppercase opacity-70">Oct</div>
                </div>
                <div className="w-px bg-slate-300 dark:bg-slate-700"></div>
                <div>
                    <div className="font-bold text-2xl">08:00</div>
                    <div className="text-xs uppercase opacity-70">AM</div>
                </div>
                <div className="w-px bg-slate-300 dark:bg-slate-700"></div>
                <div>
                    <div className="font-bold text-2xl">Dhaka</div>
                    <div className="text-xs uppercase opacity-70">Central</div>
                </div>
            </div>
            <button className="btn btn-primary">Register as Volunteer</button>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-[-250px] text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
            {[
                { q: 'Is this service free to use?', a: 'Yes, Clean City is a completely free platform for all citizens.' },
                { q: 'How long does it take to resolve an issue?', a: 'It depends on the complexity. However, most minor issues are acknowledged within 48 hours.' },
                { q: 'Can I report anonymously?', a: 'Yes, your identity is kept private on public listings, but we need your details for verification.' }
            ].map((faq, i) => (
                <div key={i} className="collapse collapse-plus bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <input type="radio" name="my-accordion-3" defaultChecked={i === 0} /> 
                    <div className="collapse-title text-lg font-medium">
                        {faq.q}
                    </div>
                    <div className="collapse-content text-slate-600 dark:text-slate-400">
                        <p>{faq.a}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* SECTION 9: Mobile App CTA */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Report on the Go!</h2>
                <p className="text-slate-300 mb-8 text-lg">Download our mobile app to report issues directly from your camera, track location via GPS, and get instant push notifications.</p>
                <div className="flex flex-wrap gap-4">
                    <button className="btn bg-white text-black hover:bg-slate-200 border-none flex items-center gap-2">
                        <span>🍎</span> App Store
                    </button>
                    <button className="btn bg-transparent border border-white text-white hover:bg-white/10 flex items-center gap-2">
                        <span>🤖</span> Google Play
                    </button>
                </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* SECTION 10: Newsletter */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto">Subscribe to our weekly newsletter to get updates on completed projects, top contributors, and upcoming volunteer opportunities.</p>
        <form className="max-w-md mx-auto flex gap-2">
            <input type="email" placeholder="Enter your email" className="input flex-1" required />
            <button className="btn btn-primary">Subscribe</button>
        </form>
      </section>

    </div>
  );
}