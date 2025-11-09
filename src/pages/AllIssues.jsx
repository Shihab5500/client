// import { Helmet } from 'react-helmet-async';
// import { useEffect, useState } from 'react';
// import { getIssues } from '../services/issues';
// import IssueCard from '../components/IssueCard';
// import Filters from '../components/Filters';

// export default function AllIssues(){
//   const [data, setData] = useState({ items: [], total: 0 });
//   const [filters, setFilters] = useState({});

//   const fetchData = async (page=1) => {
//     const res = await getIssues({ ...filters, page, limit: 12 });
//     setData(res);
//   };

//   useEffect(()=>{ fetchData(); },[]);

//   return (
//     <div>
//       <Helmet><title>All Issues — Clean City</title></Helmet>
//       <Filters filters={filters} setFilters={setFilters} onSearch={()=>fetchData()} />
//       <div className="grid-3 mt-4">
//         {data.items.map(it => <IssueCard key={it._id} issue={it} />)}
//       </div>
//     </div>
//   );
// }


// src/pages/AllIssues.jsx

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getIssues } from '../services/issues';
import IssueCard from '../components/IssueCard'; // (আপনার ইস্যু কার্ড কম্পোনেন্ট)
import { useDebounce } from '../hooks/useDebounce'; // (আমাদের নতুন হুক)
import Spinner from '../components/Spinner'; // (আপনার লোডিং স্পিনার কম্পোনেন্ট)

export default function AllIssues() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true); // <-- লোডিং স্টেট

  // প্রতিটি ফিল্টারের জন্য আলাদা স্টেট
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(''); // '' মানে 'All'
  const [status, setStatus] = useState('');   // '' মানে 'All'

  // Debounce: ইউজার টাইপ বন্ধ করার ৫০০ms পর এই ভ্যালুটি আপডেট হবে
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // ডেটা আনার ফাংশন
  const fetchData = async (page = 1) => {
    setLoading(true); // <-- লোডিং শুরু
    try {
      const filters = {
        search: debouncedSearchTerm,
        category: category,
        status: status,
        page: page,
        limit: 12
      };
      
      const res = await getIssues(filters);
      setData(res);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false); // <-- লোডিং শেষ
    }
  };

  // Debounced সার্চ টার্ম, ক্যাটাগরি বা স্ট্যাটাস পরিবর্তন হলেই fetchData আবার কল হবে
  useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm, category, status]); // <-- মূল ট্রিক

  return (
    <div>
      <Helmet><title>All Issues — Clean City</title></Helmet>

      {/* ===== ফিল্টার বার (আপনার স্ক্রিনশট অনুযায়ী) ===== */}
      <div className="card mb-4 p-4 grid md:grid-cols-4 gap-4 items-end">
        {/* সার্চ ইনপুট */}
        <div className="md:col-span-2">
          <label className="label">Search</label>
          <input 
            type="text"
            placeholder="title / location / description"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // <-- স্টেট আপডেট
          />
        </div>
        
        {/* ক্যাটাগরি ড্রপডাউন */}
        <div>
          <label className="label">Category</label>
          <select 
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // <-- স্টেট আপডেট
          >
            <option value="">All</option>
            <option value="Garbage">Garbage</option>
            <option value="Illegal Construction">Illegal Construction</option>
            <option value="Broken Public Property">Broken Public Property</option>
            <option value="Road Damage">Road Damage</option>
          </select>
        </div>

        {/* স্ট্যাটাস ড্রপডাউন */}
        <div>
          <label className="label">Status</label>
          <select 
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)} // <-- স্টেট আপডেট
          >
            <option value="">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      {/* ===== লোডিং বা ডেটা গ্রিড ===== */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner /> {/* আপনার লোডিং স্পিনার */}
        </div>
      ) : (
        <>
          <div className="grid-3 mt-4">
            {data.items.map(it => <IssueCard key={it._id} issue={it} />)}
          </div>
          
          {data.items.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No issues found matching your filters.
            </div>
          )}
          {/* এখানে Pagination বা "Load More" বাটন যোগ করতে পারেন */}
        </>
      )}
    </div>
  );
}