
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function About() {
  
  
  const teamMembers = [
    { id: 1, name: "Rahim Ahmed", role: "Founder & CEO", img: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg" },
    { id: 2, name: "Sarah Khan", role: "Community Manager", img: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg" },
    { id: 3, name: "Karim Ullah", role: "Tech Lead", img: "https://img.freepik.com/free-photo/handsome-young-man-with-new-stylish-haircut_176420-19637.jpg" },
  ];

  const values = [
    { title: "Transparency", desc: "Every report is tracked publicly to ensure accountability.", icon: "🔍" },
    { title: "Community", desc: "We believe in the power of people working together.", icon: "🤝" },
    { title: "Impact", desc: "Small actions lead to massive changes in our city.", icon: "🌱" },
    { title: "Technology", desc: "Using smart tech to solve age-old urban problems.", icon: "💻" },
  ];

  return (
    <div className="bg-base-100 dark:bg-slate-950 text-base-content font-sans">
      <Helmet><title>About Us | Clean City</title></Helmet>

      
      <div 
        className="relative h-[400px] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1444723121867-bd17104d80b5?q=80&w=2024&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center text-white px-4 animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Clean City</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
            Empowering citizens to build smarter, cleaner, and safer neighborhoods through technology and community action.
          </p>
        </div>
      </div>

      
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/20 rounded-2xl blur-xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" 
              alt="Teamwork" 
              className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 transform hover:scale-[1.02] transition duration-500"
            />
          </div>
          <div className="space-y-6">
            <h4 className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Our Mission</h4>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Bridging the gap between <span className="text-emerald-600">Citizens</span> and <span className="text-emerald-600">Authorities</span>.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Clean City started with a simple idea: reporting a problem shouldn't be harder than facing it. 
              We provide a platform where your voice is heard, issues are tracked, and solutions are visible.
            </p>
            
            {/* Stats Counter */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">10K+</h3>
                <p className="text-sm text-slate-500">Active Users</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">5K+</h3>
                <p className="text-sm text-slate-500">Issues Solved</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">50+</h3>
                <p className="text-sm text-slate-500">Cities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. Core Values (Hover Cards) --- */}
      <div className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">The principles that guide every decision we make at Clean City.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-2">
                <div className="text-4xl mb-4 bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 flex items-center justify-center rounded-full group-hover:scale-110 transition duration-300">
                    {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition">{val.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 4. Meet The Team --- */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
          <p className="text-slate-500">The passionate minds behind the revolution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-emerald-100 dark:border-emerald-900 shadow-lg">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-emerald-600 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 5. CTA Section --- */}
      <div className="bg-emerald-600 py-16">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of citizens who are already transforming their communities one report at a time.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn bg-white text-emerald-700 hover:bg-slate-100 border-none px-8 font-bold">
              Join Now
            </Link>
            <Link to="/contact" className="btn btn-outline text-white hover:bg-white/20 px-8">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}