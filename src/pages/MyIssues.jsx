


import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyIssues, updateIssue, deleteIssue } from '../services/issues';
import { toast, confirm } from '../utils/toast';
import Spinner from '../components/Spinner';

export default function MyIssues() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getMyIssues();
      setRows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (await confirm('Are you sure you want to delete this issue?')) {
      try {
        await deleteIssue(id);
        toast('success', 'Issue deleted successfully');
        setRows(rows.filter((r) => r._id !== id));
      } catch (e) {
        toast('error', e.message);
      }
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get('title'),
      category: fd.get('category'),
      amount: Number(fd.get('amount')),
      description: fd.get('description'),
      status: fd.get('status'),
    };
    try {
      await updateIssue(editing._id, payload);
      toast('success', 'Issue updated successfully');
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
        <title>My Issues — Clean City</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Reports</h2>
          <p className="text-slate-500">Manage the issues you have reported.</p>
        </div>
        <Link to="/dashboard/add-issue" className="btn btn-primary btn-sm w-full sm:w-auto">
          + Report New
        </Link>
      </div>

      {/* Table Card */}
      <div className="w-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        {rows.length === 0 ? (
          <div className="p-10 text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-lg font-bold">No reports found</h3>
            <p className="text-slate-500 mb-4">You haven't reported any issues yet.</p>
            <Link to="/dashboard/add-issue" className="btn btn-outline btn-sm">
              Start Reporting
            </Link>
          </div>
        ) : (
          <>
            
            <div className="overflow-x-auto p-2">
              <table className="table table-fixed w-full min-w-[900px]">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                  <tr>
                    <th className="text-left w-[360px]">Title & Date</th>
                    <th className="text-left w-[220px]">Category</th>
                    <th className="text-left w-[140px]">Budget</th>
                    <th className="text-left w-[160px]">Status</th>
                    <th className="text-right w-[200px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r._id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="w-[360px]">
                        <div className="font-bold truncate" title={r.title}>
                          {r.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          {new Date(r.date).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="w-[220px]">
                        <span className="badge badge-ghost bg-slate-100 dark:bg-slate-800">
                          {r.category}
                        </span>
                      </td>

                      <td className="w-[140px] font-mono">৳{r.amount}</td>

                      <td className="w-[160px]">
                        <span
                          className={`badge border-none text-xs font-semibold ${
                            r.status === 'ongoing'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {r.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="w-[200px]">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditing(r)}
                            className="btn btn-square btn-sm btn-ghost text-slate-500 hover:text-blue-600 tooltip"
                            data-tip="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>

                          <button
                            onClick={() => onDelete(r._id)}
                            className="btn btn-square btn-sm btn-ghost text-slate-500 hover:text-red-600 tooltip"
                            data-tip="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>

                          <Link
                            to={`/issues/${r._id}`}
                            className="btn btn-square btn-sm btn-ghost text-slate-500 hover:text-emerald-600 tooltip"
                            data-tip="View"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 text-xs text-slate-400 sm:hidden border-t border-slate-100 dark:border-slate-800">
              
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setEditing(null)}
        >
          <div
            className="card w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl p-4 sm:p-6 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Update Issue</h3>
              <button onClick={() => setEditing(null)} className="btn btn-sm btn-circle btn-ghost">
                ✕
              </button>
            </div>

            <form onSubmit={onSave} className="space-y-4">
              <div>
                <label className="label font-semibold">Title</label>
                <input name="title" className="input w-full bg-slate-50" defaultValue={editing.title} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label font-semibold">Category</label>
                  <select name="category" className="select select-bordered w-full bg-slate-50" defaultValue={editing.category}>
                    {['Garbage', 'Illegal Construction', 'Broken Public Property', 'Road Damage'].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label font-semibold">Status</label>
                  <select name="status" className="select select-bordered w-full bg-slate-50" defaultValue={editing.status}>
                    <option value="ongoing">Ongoing</option>
                    <option value="ended">Ended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label font-semibold">Budget (৳)</label>
                <input name="amount" type="number" className="input w-full bg-slate-50" defaultValue={editing.amount} required />
              </div>

              <div>
                <label className="label font-semibold">Description</label>
                <textarea name="description" className="textarea textarea-bordered w-full bg-slate-50 h-24" defaultValue={editing.description} required />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4 pt-4 border-t dark:border-slate-800">
                <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
