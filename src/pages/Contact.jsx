


import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

export default function Contact() {

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    
    const form = e.target;
    
    Swal.fire({
      title: 'Sending...',
      text: 'Please wait while we send your message.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 1500
    }).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully!',
            text: 'Thank you for reaching out. Our team will respond within 24 hours.',
            confirmButtonColor: '#10B981', 
            background: '#fff',
            iconColor: '#10B981'
        });
        form.reset();
    });
  };

  const contactInfo = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
        ),
        title: "Phone Support",
        desc: "24/7 Available for emergency issues.",
        value: "+880 1712 345 678",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
        ),
        title: "Email Assistance",
        desc: "Send us your queries anytime.",
        value: "support@cleancity.com",
        color: "bg-emerald-100 text-emerald-600"
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
        ),
        title: "Headquarters",
        desc: "Visit us for a coffee chat.",
        value: "Level 4, Gulshan-1, Dhaka-1212",
        color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="bg-base-100 dark:bg-slate-950 min-h-screen font-sans">
      <Helmet><title>Contact Us | Clean City</title></Helmet>
      
      {/* --- Header Section --- */}
      <div className="bg-emerald-600 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in Touch</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                Have questions about reporting an issue? Want to partner with us? 
                We are here to help you build a cleaner community.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- Left Side: Contact Info Cards --- */}
            <div className="lg:col-span-1 space-y-6">
                {contactInfo.map((info, idx) => (
                    <div key={idx} className="card bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="card-body p-6">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-2xl ${info.color}`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">{info.title}</h3>
                                    <p className="text-slate-500 text-sm mb-1">{info.desc}</p>
                                    <p className="font-semibold text-slate-700 dark:text-slate-300">{info.value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Social Links Card */}
                <div className="card bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xl">
                    <div className="card-body p-6 text-center">
                        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                        <div className="flex justify-center gap-4">
                            {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                                <button key={social} className="btn btn-circle btn-sm bg-white/10 border-none hover:bg-emerald-500 text-white">
                                    <i className={`fab fa-${social}`}></i> {/* FontAwesome icon placeholder, or use SVG */}
                                    <span className="capitalize text-xs">{social[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Right Side: Modern Contact Form --- */}
            <div className="lg:col-span-2">
                <div className="card bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 h-full">
                    <div className="card-body p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Send us a Message</h2>
                        <form onSubmit={handleSendMessage} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="input input-bordered w-full focus:input-primary bg-slate-50 dark:bg-slate-800" required />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="input input-bordered w-full focus:input-primary bg-slate-50 dark:bg-slate-800" required />
                                </div>
                            </div>
                            
                            <div className="form-control">
                                <label className="label font-semibold text-slate-600 dark:text-slate-400">Subject</label>
                                <input type="text" placeholder="Regarding road maintenance..." className="input input-bordered w-full focus:input-primary bg-slate-50 dark:bg-slate-800" required />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold text-slate-600 dark:text-slate-400">Message</label>
                                <textarea placeholder="Describe your issue or query here..." className="textarea textarea-bordered h-40 w-full focus:textarea-primary bg-slate-50 dark:bg-slate-800" required></textarea>
                            </div>

                            <div className="form-control mt-4">
                                <button className="btn btn-primary w-full text-lg font-bold text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all">
                                    Send Message
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

        {/* --- Google Map Section --- */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430139!2d90.39108037604368!3d23.75085808876092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3f983d%3A0x2096818461d5e765!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1703000000000!5m2!1sen!2sbd" 
                width="100%" 
                height="450" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
        </div>

      </div>
    </div>
  );
}