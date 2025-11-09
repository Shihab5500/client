import { Link } from 'react-router-dom';
export default function IssueCard({ issue }) {
  return (
    <div className="card flex flex-col">
      <img src={issue.image} alt={issue.title} className="h-40 w-full object-cover rounded-xl" />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg line-clamp-1">{issue.title}</h3>
        <p className="text-sm opacity-80 line-clamp-2">{issue.description}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs opacity-90">
          <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">{issue.category}</span>
          <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{issue.location}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold">৳ {issue.amount}</span>
        <Link to={`/issues/${issue._id}`} className="btn btn-primary">See Details</Link>
      </div>
    </div>
  );
}
