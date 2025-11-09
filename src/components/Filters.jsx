export default function Filters({ filters, setFilters, onSearch }) {
  return (
    <div className="card flex flex-col md:flex-row gap-3 items-end">
      <div className="flex-1">
        <label className="label">Search</label>
        <input className="input" placeholder="title / location / description" value={filters.search||''} onChange={e=>setFilters({...filters, search:e.target.value})} />
      </div>
      <div>
        <label className="label">Category</label>
        <select className="input" value={filters.category||''} onChange={e=>setFilters({...filters, category:e.target.value||undefined})}>
          <option value="">All</option>
          {['Garbage','Illegal Construction','Broken Public Property','Road Damage'].map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Status</label>
        <select className="input" value={filters.status||''} onChange={e=>setFilters({...filters, status:e.target.value||undefined})}>
          <option value="">All</option>
          <option value="ongoing">ongoing</option>
          <option value="ended">ended</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={onSearch}>Apply</button>
    </div>
  );
}
