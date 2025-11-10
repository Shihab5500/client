
import { Helmet } from 'react-helmet-async';
import PrivateRoute from '../components/PrivateRoute';
import { myContributions } from '../services/contributions';
import { useEffect, useState } from 'react';
import { toast } from '../utils/toast'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Spinner from '../components/Spinner'; 

function Inner(){
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async()=> {
      try {
        setLoading(true); //  লোডিং শুরু
        setRows(await myContributions());
      } catch (err) {
        toast('error', err.message);
      } finally {
        setLoading(false); // লোডিং শেষ
      }
    })();
  },[]);

  const download = () => {
    if (!rows.length) return toast('info','No contributions to download');
    
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Clean City — Contribution Report', 14, 18);
    
    const head = [['Issue Title', 'Category', 'Paid Amount', 'Date']];
    const body = rows.map(r => [
      r.issueDetails?.title || r.issueId,
      r.issueDetails?.category || 'N/A', 
      `৳ ${r.amount}`,
      new Date(r.date).toLocaleString()
    ]);

    autoTable(doc, {
      startY: 24,
      head: head,
      body: body
    });
    
    doc.save('my_contributions.pdf');
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">My Contributions</h3>
        <button className="btn btn-primary" onClick={download}>Download Report</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* টেবিল হেড */}
          <thead>
            <tr className="text-left">
              <th className="p-2">Issue Title/ID</th>
              <th className="p-2">Category</th>
              <th className="p-2">Paid Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          {/* টেবিল বডি */}
          <tbody>
            {loading && (
              <tr><td colSpan="4" className="p-4 text-center"><Spinner /></td></tr>
            )}

            {!loading && rows.length === 0 && (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">You have not made any contributions yet.</td></tr>
            )}

            {rows.map(r=> (
              <tr key={r._id} className="border-t border-slate-200 dark:border-slate-800">
                {/* সার্ভার থেকে আসা নতুন ডেটা এখানে দেখানো হচ্ছে */}
                <td className="p-2">{r.issueDetails?.title || r.issueId}</td>
                <td className="p-2">{r.issueDetails?.category || 'N/A'}</td> 
                <td className="p-2">৳ {r.amount}</td>
                <td className="p-2">{new Date(r.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MyContributions(){
  return (
    <>
      <Helmet><title>My Contributions — Clean City</title></Helmet>
      <PrivateRoute><Inner/></PrivateRoute>
    </>
  );
}