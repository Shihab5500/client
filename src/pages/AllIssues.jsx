

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getIssues } from '../services/issues';
import IssueCard from '../components/IssueCard'; 
import { useDebounce } from '../hooks/useDebounce'; 
import Spinner from '../components/Spinner'; 

export default function AllIssues() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true); 

  
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(''); 
  const [status, setStatus] = useState(''); 
  const [sort, setSort] = useState('newest'); 
  const [page, setPage] = useState(1); 

  const limit = 8; 
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // ডেটা আনার ফাংশন
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filters = {
          search: debouncedSearchTerm,
          category,
          status,
          sort, 
          page,
          limit
        };
        
      
        
        const res = await getIssues(filters);
        setData(res);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchTerm, category, status, sort, page]);

  // ফিল্টার রিসেট ফাংশন
  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setStatus('');
    setSort('newest');
    setPage(1);
  };

  // পেজ বদলানোর হ্যান্ডলার
  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="pb-10">
      <Helmet><title>All Issues — Clean City</title></Helmet>

      {/* পেজ হেডার */}
      <div className="text-center py-6">
        <h2 className="text-3xl font-bold">Community Reports</h2>
        <p className="text-slate-500 mt-1">Browse, filter and help resolve community issues</p>
      </div>
      
      {/* ফিল্টার এবং সার্চ বার */}
      <div className="card mb-8 p-4 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          {/* সার্চ */}
          <div className="lg:col-span-2">
            <label className="label">Search</label>
            <div className="relative">
                <input 
                    type="text"
                    placeholder="Search by title, location..."
                    className="input pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>
          </div>
          
          {/* ক্যাটাগরি */}
          <div>
            <label className="label">Category</label>
            <select 
              className="input cursor-pointer"
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }} 
            >
              <option value="">All Categories</option>
              <option value="Garbage">Garbage</option>
              <option value="Illegal Construction">Illegal Construction</option>
              <option value="Broken Public Property">Broken Property</option>
              <option value="Road Damage">Road Damage</option>
            </select>
          </div>

          
          <div>
            <label className="label">Status</label>
            <select 
              className="input cursor-pointer"
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }} 
            >
              <option value="">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          
          <div>
             <button onClick={handleReset} className="btn btn-outline w-full h-[42px] border-slate-300 dark:border-slate-600">
                Reset Filters
             </button>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
         <div className="text-slate-500 font-medium">
            Showing <span className="text-emerald-600 font-bold">{data.items.length}</span> of <span className="font-bold">{data.total}</span> reports
         </div>
         <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <select 
                className="select select-sm select-bordered rounded-lg bg-transparent"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
            </select>
         </div>
      </div>

      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner /> 
        </div>
      ) : (
        <>
          {data.items.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
               <div className="text-6xl mb-4">🔍</div>
               <h3 className="text-xl font-bold">No issues found</h3>
               <p className="text-slate-500">Try adjusting your filters or search terms.</p>
               <button onClick={handleReset} className="btn btn-primary mt-4">Clear All Filters</button>
            </div>
          ) : (
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.items.map(it => <IssueCard key={it._id} issue={it} />)}
            </div>
          )}
          
          {/* পেজিনেশন */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
                <button 
                    className="btn btn-outline btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    « Previous
                </button>
                
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                   <button
                      key={pageNum}
                      className={`btn btn-sm w-10 ${page === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => setPage(pageNum)}
                   >
                      {pageNum}
                   </button>
                ))}

                <button 
                    className="btn btn-outline btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                >
                    Next »
                </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}