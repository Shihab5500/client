

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getIssue, getIssues } from '../services/issues'; 
import { listByIssue, contribute } from '../services/contributions';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../utils/toast';
import Modal from '../components/Modal';
import IssueCard from '../components/IssueCard'; 

export default function IssueDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [issue, setIssue] = useState(null);
  const [related, setRelated] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    window.scrollTo(0, 0); 
    
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const issueData = await getIssue(id);
        setIssue(issueData);
        const contribData = await listByIssue(id);
        setContributors(contribData);

        
        if (issueData?.category) {
          const res = await getIssues({ category: issueData.category, limit: 3 });
          
          const relatedItems = res.items.filter(item => item._id !== id).slice(0, 3);
          setRelated(relatedItems);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const totalCollected = contributors.reduce((acc, curr) => acc + Number(curr.amount), 0);
  
  
  const onContribute = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      issueId: id,
      amount: Number(form.get('amount')),
      name: form.get('name'),
      phone: form.get('phone'),
      address: form.get('address'),
      additionalInfo: form.get('additionalInfo')
    };
    try {
      await contribute(payload);
      toast('success', 'Thanks for your contribution!');
      
      const newContribs = await listByIssue(id);
      setContributors(newContribs);
      setOpen(false);
    } catch (err) {
      toast('error', err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading details...</div>;
  if (!issue) return <div className="p-10 text-center">Issue not found!</div>;

  return (
    <div className="pb-10">
      <Helmet><title>{issue.title} — Clean City</title></Helmet>

      
      <div className="grid lg:grid-cols-3 gap-8">
        
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm h-[300px] md:h-[400px]">
            <img src={issue.image} alt={issue.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>

          {/* Title & Meta */}
          <div>
             <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wide">{issue.category}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${issue.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                    {issue.status}
                </span>
                <span className="text-sm text-slate-500">Posted on {new Date(issue.date).toLocaleDateString()}</span>
             </div>
             <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{issue.title}</h1>
             
             <div className="flex items-center gap-2 text-slate-500 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <span>{issue.location}</span>
             </div>

             <div className="divider"></div>

             {/* Description */}
             <div>
                <h3 className="text-xl font-bold mb-3">Overview</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {issue.description}
                </p>
             </div>
          </div>

          {/* Contributors Table */}
          <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-4 px-2">Recent Contributors ({contributors.length})</h3>
            {contributors.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800">
                                <th>Name</th>
                                <th>Date</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contributors.map((c) => (
                                <tr key={c._id} className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="font-medium flex items-center gap-2">
                                        <div className="avatar placeholder">
                                            <div className="bg-emerald-600 text-white rounded-full w-8">
                                                <span>{c.name?.charAt(0)}</span>
                                            </div>
                                        </div>
                                        {c.name}
                                    </td>
                                    <td className="text-sm opacity-70">{new Date(c.date).toLocaleDateString()}</td>
                                    <td className="text-right font-bold text-emerald-600">৳ {c.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-slate-500 italic px-2">No contributions yet. Be the first one!</p>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar (Sticky) */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                
                {/* Donation Card */}
                <div className="card bg-white dark:bg-slate-900 shadow-xl border border-emerald-100 dark:border-slate-800 p-6">
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">Target Budget</div>
                    <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">৳ {issue.amount}</div>
                    
                    {/* Progress Bar */}
                    <div className="mb-2 flex justify-between text-sm font-medium">
                        <span>Raised: ৳ {totalCollected}</span>
                        <span>{Math.min(100, Math.round((totalCollected / issue.amount) * 100))}%</span>
                    </div>
                    <progress className="progress progress-success w-full h-3 mb-6" value={totalCollected} max={issue.amount}></progress>

                    <button 
                        onClick={() => setOpen(true)} 
                        className="btn btn-primary w-full text-lg shadow-emerald-200 dark:shadow-none shadow-lg animate-pulse hover:animate-none"
                    >
                        Donate Now
                    </button>
                    <p className="text-xs text-center mt-3 text-slate-500">Secure payment via clean city portal</p>
                </div>

                {/* Author Info */}
                <div className="card bg-slate-50 dark:bg-slate-800/50 p-6">
                    <h4 className="font-bold mb-3">Reported By</h4>
                    <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-slate-300 text-slate-700 rounded-full w-12">
                                <span className="text-xl">{issue.email?.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="font-semibold truncate">{issue.email}</div>
                            <div className="text-xs text-slate-500">Verified Citizen</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Related Items Section */}
      {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-emerald-500 pl-3">Related Issues</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(item => <IssueCard key={item._id} issue={item} />)}
            </div>
          </div>
      )}

      {/* Contribution Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="p-2">
            <h3 className="text-2xl font-bold mb-1 text-emerald-700">Make a Contribution</h3>
            <p className="text-sm text-slate-500 mb-6">Your help will solve: <span className="font-semibold">{issue.title}</span></p>
            
            <form onSubmit={onContribute} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Amount (৳)</label>
                    <input name="amount" className="input bg-slate-50" type="number" placeholder="500" required min="1" />
                </div>
                <div>
                    <label className="label">Your Name</label>
                    <input name="name" className="input bg-slate-50" placeholder="Full Name" defaultValue={user?.displayName || ''} required />
                </div>
            </div>
            
            <div>
                <label className="label">Email</label>
                <input name="email" className="input bg-slate-100 cursor-not-allowed" value={user?.email || ''} readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="label">Phone</label>
                    <input name="phone" className="input bg-slate-50" placeholder="017..." required />
                </div>
                <div>
                    <label className="label">Address</label>
                    <input name="address" className="input bg-slate-50" placeholder="Dhaka, BD" required />
                </div>
            </div>
            
            <div>
                <label className="label">Note (Optional)</label>
                <textarea name="additionalInfo" className="input bg-slate-50 h-20" placeholder="Any message for us?"></textarea>
            </div>
            
            <button className="btn btn-primary w-full mt-2" type="submit">Confirm Payment</button>
            </form>
        </div>
      </Modal>
    </div>
  );
}