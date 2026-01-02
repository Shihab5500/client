


import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getIssues, updateIssue, deleteIssue } from '../services/issues';
import { toast, confirm } from '../utils/toast';
import Spinner from '../components/Spinner';

export default function ManageIssues() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  // সব ইস্যু লোড করা
  const load = async () => {
    try {
      const data = await getIssues({ limit: 1000 });
      setRows(data.items);
    } catch (err) {
      console.error(err);
      toast('error', 'Failed to load issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // অ্যাডমিন ডিলিট ফাংশন
  const onDelete = async (id) => {
    const isConfirmed = await confirm(
      'Are you sure you want to delete this report? This action cannot be undone.'
    );

    if (isConfirmed) {
      try {
        await deleteIssue(id);
        toast('success', 'Issue deleted successfully');
        setRows((prevRows) => prevRows.filter((r) => r._id !== id));
      } catch (e) {
        console.error(e);
        toast('error', e.message || 'Failed to delete issue');
      }
    }
  };

  // স্ট্যাটাস আপডেট ফাংশন
  const onSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = { status: fd.get('status') };

    try {
      await updateIssue(editing._id, payload);
      toast('success', 'Status updated successfully');
      setEditing(null);
      load();
    } catch (e) {
      toast('error', e.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="w-full">
      <Helmet>
        <title>Manage All Issues — Admin</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">System Reports</h2>
          <p className="text-slate-500">Manage all issues reported by users.</p>
        </div>
        <div className="badge badge-primary badge-outline w-fit">Total: {rows.length}</div>
      </div>

      {/* Table Card */}
      <div className="card bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden rounded-xl">
        {/* ✅ swipe on mobile */}
        <div className="overflow-x-auto">
          <table className="table table-fixed w-full min-w-[980px]">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left w-[260px] py-4">Reported By</th>
                <th className="text-left w-[280px] py-4">Issue Title</th>
                <th className="text-left w-[220px] py-4">Category</th>
                <th className="text-left w-[140px] py-4">Status</th>
                <th className="text-right w-[220px] py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="align-top py-4">
                    <div className="font-bold leading-tight">{r.name || 'Anonymous'}</div>
                    <div className="text-xs opacity-60 break-all">{r.email}</div>
                  </td>

                  <td className="align-top py-4">
                    <div className="font-medium truncate max-w-[260px]" title={r.title}>
                      {r.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(r.date).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="align-top py-4">
                    <span className="badge badge-ghost badge-sm whitespace-nowrap">
                      {r.category}
                    </span>
                  </td>

                  <td className="align-top py-4">
                    <span
                      className={`badge border-none font-semibold whitespace-nowrap ${
                        r.status === 'ongoing'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {r.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="align-top py-4">
                    <div className="flex justify-end gap-2 flex-nowrap">
                      {/* Update Button */}
                      <button
                        onClick={() => setEditing(r)}
                        className="btn btn-sm btn-outline border-slate-300 hover:bg-slate-100 hover:text-slate-800 whitespace-nowrap"
                      >
                        Update Status
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => onDelete(r._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none flex items-center gap-2 whitespace-nowrap"
                        title="Delete this issue"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ mobile hint */}
        {rows.length > 0 && (
          <div className="px-4 py-3 text-xs text-slate-400 sm:hidden border-t border-slate-100 dark:border-slate-800">
            
          </div>
        )}
      </div>

      {/* Admin Edit Modal */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setEditing(null)}
        >
          <div
            className="card w-full max-w-sm bg-white dark:bg-slate-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Change Report Status</h3>
            <p className="text-sm text-slate-500 mb-4">
              Issue: <span className="font-semibold">{editing.title}</span>
            </p>

            <form onSubmit={onSave}>
              <label className="label font-semibold">Status</label>
              <select
                name="status"
                className="select select-bordered w-full mb-6 bg-slate-50 dark:bg-slate-800"
                defaultValue={editing.status}
              >
                <option value="ongoing">Ongoing (Pending)</option>
                <option value="ended">Ended (Resolved)</option>
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
