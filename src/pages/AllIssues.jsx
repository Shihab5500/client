

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getIssues } from '../services/issues';
import IssueCard from '../components/IssueCard'; 
import { useDebounce } from '../hooks/useDebounce'; 
import Spinner from '../components/Spinner'; 

export default function AllIssues() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true); 

  // প্রতিটি ফিল্টারের জন্য আলাদা স্টেট
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(''); 
  const [status, setStatus] = useState('');   

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
  }, [debouncedSearchTerm, category, status]); 

  return (
    <div>
      <Helmet><title>All Issues — Clean City</title></Helmet>

      
      <div className="card mb-4 p-4 grid md:grid-cols-4 gap-4 items-end">
        
        <div className="md:col-span-2">
          <label className="label">Search</label>
          <input 
            type="text"
            placeholder="title / location / description"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        
        
        <div>
          <label className="label">Category</label>
          <select 
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
          >
            <option value="">All</option>
            <option value="Garbage">Garbage</option>
            <option value="Illegal Construction">Illegal Construction</option>
            <option value="Broken Public Property">Broken Public Property</option>
            <option value="Road Damage">Road Damage</option>
          </select>
        </div>

        
        <div>
          <label className="label">Status</label>
          <select 
            className="input"
            value={status}
            onChange={(e) => setStatus(e.target.value)} 
          >
            <option value="">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="ended">Ended</option>
          </select>
        </div>
      </div>

      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner /> 
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
          
        </>
      )}
    </div>
  );
}