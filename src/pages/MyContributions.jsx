


import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { myContributions } from '../services/contributions';
import { toast } from '../utils/toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Spinner from '../components/Spinner';

export default function MyContributions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await myContributions();
        setRows(data);
      } catch (err) {
        toast('error', err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalDonated = rows.reduce((acc, curr) => acc + Number(curr.amount), 0);

  const download = () => {
    if (!rows.length) return toast('info', 'No contributions to download');

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(5, 150, 105); 
    doc.text('Clean City Foundation', 14, 22);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Contribution History Report', 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);

    const head = [['Issue', 'Category', 'Amount (BDT)', 'Date']];
    const body = rows.map((r) => [
      r.issueDetails?.title || r.issueId,
      r.issueDetails?.category || 'N/A',
      `${r.amount}`,
      new Date(r.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      startY: 45,
      head: head,
      body: body,
      theme: 'grid',
      headStyles: { fillColor: [5, 150, 105] },
    });

    // Footer Total
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Total Donated: ${totalDonated} BDT`, 14, doc.lastAutoTable.finalY + 15);

    doc.save('clean_city_donations.pdf');
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full">
      <Helmet>
        <title>My Contributions — Clean City</title>
      </Helmet>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Donation History</h2>
        <p className="text-slate-500">Track your financial support to the community.</p>
      </div>

      {/* Summary Card */}
      <div className="card bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 mb-8 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="opacity-90 font-medium">Total Contributed</p>
            <h3 className="text-4xl font-bold mt-1">৳ {totalDonated}</h3>
          </div>
          <div className="bg-white/20 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="card bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold">Recent Transactions</h3>

          <button
            onClick={download}
            className="btn btn-sm btn-outline gap-2 w-full sm:w-auto"
            disabled={rows.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          {rows.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No contributions found.</div>
          ) : (
            <table className="table table-fixed w-full min-w-[760px]">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="text-left w-[360px]">Issue Title</th>
                  <th className="text-left w-[200px]">Category</th>
                  <th className="text-left w-[140px]">Amount</th>
                  <th className="text-left w-[160px]">Date</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr key={r._id} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="w-[360px]">
                      <div className="font-medium truncate" title={r.issueDetails?.title || 'Deleted Issue'}>
                        {r.issueDetails?.title || 'Deleted Issue'}
                      </div>
                    </td>

                    <td className="w-[200px]">
                      <span className="badge badge-sm badge-ghost">
                        {r.issueDetails?.category || 'N/A'}
                      </span>
                    </td>

                    <td className="w-[140px]">
                      <span className="font-bold text-emerald-600 whitespace-nowrap">+ ৳{r.amount}</span>
                    </td>

                    <td className="w-[160px]">
                      <span className="text-sm opacity-70 whitespace-nowrap">
                        {new Date(r.date).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile hint */}
        {rows.length > 0 && (
          <div className="px-4 py-3 text-xs text-slate-400 sm:hidden border-t border-slate-100 dark:border-slate-800">
            
          </div>
        )}
      </div>
    </div>
  );
}
