import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssue } from '../services/issues';
import { listByIssue, contribute } from '../services/contributions';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../utils/toast';
import Modal from '../components/Modal';

export default function IssueDetails(){
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useEffect(()=>{ (async()=>{ setIssue(await getIssue(id)); setRows(await listByIssue(id)); })(); },[id]);

  const total = rows.reduce((s,r)=>s+Number(r.amount),0);

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
    try{
      await contribute(payload);
      toast('success','Thanks for contributing!');
      setRows(await listByIssue(id));
      setOpen(false);
    }catch(err){ toast('error', err.message); }
  };

  if (!issue) return null;

  return (
    <div>
      <Helmet><title>{issue.title} — Clean City</title></Helmet>
      <div className="grid md:grid-cols-2 gap-6">
        <img src={issue.image} alt={issue.title} className="w-full h-64 object-cover rounded-2xl" />
        <div>
          <h2 className="text-2xl font-bold">{issue.title}</h2>
          <p className="opacity-80 mt-1">{issue.description}</p>
          <div className="mt-3 text-sm space-y-1">
            <div><b>Category:</b> {issue.category}</div>
            <div><b>Location:</b> {issue.location}</div>
            <div><b>Date:</b> {new Date(issue.date).toLocaleDateString()}</div>
            <div><b>Suggested Budget:</b> ৳ {issue.amount}</div>
            <div><b>Status:</b> {issue.status}</div>
          </div>
          <button className="btn btn-primary mt-4" onClick={()=>setOpen(true)}>Pay Clean-Up Contribution</button>
        </div>
      </div>

      <div className="mt-8 card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Contributors</h3>
          <div className="text-sm opacity-80">Total Collected: ৳ {total} / ৳ {issue.amount}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left"><th className="p-2">Contributor</th><th className="p-2">Amount</th><th className="p-2">Date</th></tr></thead>
            <tbody>
              {rows.map(r=> (
                <tr key={r._id} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="p-2 flex items-center gap-2"><img className="h-6 w-6 rounded-full" src={`https://i.pravatar.cc/24?u=${r.email}`} /><span>{r.name}</span></td>
                  <td className="p-2">৳ {r.amount}</td>
                  <td className="p-2">{new Date(r.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Contribute to: {issue.title}</h3>
        <form onSubmit={onContribute} className="grid gap-3">
          <input name="amount" className="input" type="number" placeholder="Amount" required />
          <input name="name" className="input" placeholder="Contributor Name" defaultValue={user?.displayName||''} required />
          <input name="email" className="input" value={user?.email||''} readOnly />
          <input name="phone" className="input" placeholder="Phone" required />
          <input name="address" className="input" placeholder="Address" required />
          <textarea name="additionalInfo" className="input" placeholder="Additional info (optional)"></textarea>
          <button className="btn btn-primary" type="submit">Pay & Save</button>
        </form>
      </Modal>
    </div>
  );
}
