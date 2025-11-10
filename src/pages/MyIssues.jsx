// import { Helmet } from 'react-helmet-async';
// import { useEffect, useState } from 'react';
// import PrivateRoute from '../components/PrivateRoute';
// import { getMyIssues, updateIssue, deleteIssue } from '../services/issues';
// import { toast, confirm } from '../utils/toast';

// function MyIssuesInner(){
//   const [rows, setRows] = useState([]);
//   const [editing, setEditing] = useState(null);

//   const load = async()=> setRows(await getMyIssues());
//   useEffect(()=>{ load(); },[]);

//   const onSave = async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     const payload = {
//       title: fd.get('title'),
//       category: fd.get('category'),
//       amount: Number(fd.get('amount')),
//       description: fd.get('description'),
//       status: fd.get('status')
//     };
//     try{ await updateIssue(editing._id, payload); toast('success','Issue updated'); setEditing(null); load(); }catch(e){ toast('error',e.message); }
//   };

//   const onDelete = async (id) => {
//     if (await confirm('Delete this issue permanently?')) {
//       try{ await deleteIssue(id); toast('success','Issue deleted'); load(); }catch(e){ toast('error', e.message); }
//     }
//   };

//   return (
//     <div className="card overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead><tr className="text-left"><th className="p-2">Title</th><th className="p-2">Category</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
//         <tbody>
//           {rows.map(r=> (
//             <tr key={r._id} className="border-t border-slate-200 dark:border-slate-800">
//               <td className="p-2">{r.title}</td>
//               <td className="p-2">{r.category}</td>
//               <td className="p-2">৳ {r.amount}</td>
//               <td className="p-2">{r.status}</td>
//               <td className="p-2 space-x-2">
//                 <button className="btn btn-outline" onClick={()=>setEditing(r)}>Update</button>
//                 <button className="btn btn-primary" onClick={()=>onDelete(r._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editing && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//           <div className="card max-w-xl w-full">
//             <h3 className="text-lg font-semibold mb-2">Update Issue</h3>
//             <form onSubmit={onSave} className="grid gap-3">
//               <input name="title" className="input" defaultValue={editing.title} />
//               <select name="category" className="input" defaultValue={editing.category}>
//                 {['Garbage','Illegal Construction','Broken Public Property','Road Damage'].map(c=> <option key={c}>{c}</option>)}
//               </select>
//               <input name="amount" className="input" type="number" defaultValue={editing.amount} />
//               <textarea name="description" className="input" rows="3" defaultValue={editing.description} />
//               <select name="status" className="input" defaultValue={editing.status}>
//                 <option value="ongoing">ongoing</option>
//                 <option value="ended">ended</option>
//               </select>
//               <div className="flex gap-2">
//                 <button className="btn btn-primary" type="submit">Save</button>
//                 <button type="button" className="btn btn-outline" onClick={()=>setEditing(null)}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function MyIssues(){
//   return (
//     <>
//       <Helmet><title>My Issues — Clean City</title></Helmet>
//       <PrivateRoute><MyIssuesInner/></PrivateRoute>
//     </>
//   );
// }



// src/pages/MyIssues.jsx

// import { Helmet } from 'react-helmet-async';
// import { useEffect, useState } from 'react';
// import PrivateRoute from '../components/PrivateRoute';
// import { getMyIssues, updateIssue, deleteIssue } from '../services/issues';
// import { toast, confirm } from '../utils/toast'; // (আপনার toast/confirm ইউটিলিটি)

// function MyIssuesInner(){
//   const [rows, setRows] = useState([]);
//   const [editing, setEditing] = useState(null); // এই state-টি মডাল কন্ট্রোল করে

//   const load = async()=> setRows(await getMyIssues());
//   useEffect(()=>{ load(); },[]);

//   // Update/Save ফাংশন
//   const onSave = async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);
//     const payload = {
//       // আপনার ফর্মের ফিল্ডগুলো (স্ক্রিনশট অনুযায়ী)
//       title: fd.get('title'),
//       category: fd.get('category'),
//       amount: Number(fd.get('amount')),
//       description: fd.get('description'),
//       status: fd.get('status')
//     };
//     try{ 
//       await updateIssue(editing._id, payload); 
//       toast('success','Issue updated'); 
//       setEditing(null); // <-- সফল হলে মডাল বন্ধ করুন
//       load(); // টেবিল রিফ্রেশ করুন
//     }catch(e){ 
//       toast('error',e.message); 
//     }
//   };

//   // Delete ফাংশন
//   const onDelete = async (id) => {
//     if (await confirm('Delete this issue permanently?')) {
//       try{ 
//         await deleteIssue(id); 
//         toast('success','Issue deleted'); 
//         load(); // টেবিল রিফ্রেশ করুন
//       }catch(e){ 
//         toast('error', e.message); 
//       }
//     }
//   };

//   return (
//     <div className="card overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead><tr className="text-left"><th className="p-2">Title</th><th className="p-2">Category</th><th className="p-2">Amount</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
//         <tbody>
//           {rows.map(r=> (
//             <tr key={r._id} className="border-t border-slate-200 dark:border-slate-800">
//               <td className="p-2">{r.title}</td>
//               <td className="p-2">{r.category}</td>
//               <td className="p-2">৳ {r.amount}</td>
//               <td className="p-2">{r.status}</td>
//               <td className="p-2 space-x-2">
//                 {/* Update বাটনে ক্লিক করলে 'editing' state সেট হয় */}
//                 <button className="btn btn-outline" onClick={()=>setEditing(r)}>Update</button>
//                 <button className="btn btn-primary" onClick={()=>onDelete(r._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ===== আপডেটের মডাল (এখানে সমাধান করা হয়েছে) ===== */}
//       {editing && (
//         <div 
//           // সমাধান ১ (ক্যানসেল): বাইরে ক্লিক করলে মডাল বন্ধ হবে
//           onClick={() => setEditing(null)} 
//           // সমাধান ২ (স্ক্রল): 'overflow-y-auto' যোগ করা হয়েছে
//           className="fixed inset-0 bg-black/50 p-4 overflow-y-auto flex justify-center items-start"
//         >
//           <div 
//             // সমাধান ১ (ক্যানসেল): মডালের ভেতরে ক্লিক করলে বন্ধ হবে না
//             onClick={(e) => e.stopPropagation()} 
//             className="card max-w-xl w-full mt-10" // 'mt-10' দিয়ে ওপর থেকে একটু নিচে নামানো হলো
//           >
//             <h3 className="text-lg font-semibold mb-2">Update Issue</h3>
//             <form onSubmit={onSave} className="grid gap-3">
//               {/* আপনার স্ক্রিনশট অনুযায়ী ফর্ম ফিল্ড */}
//               <div><label>Title</label><input name="title" className="input" defaultValue={editing.title} /></div>
//               <div>
//                 <label>Category</label>
//                 <select name="category" className="input" defaultValue={editing.category}>
//                   {['Garbage','Illegal Construction','Broken Public Property','Road Damage'].map(c=> <option key={c}>{c}</option>)}
//                 </select>
//               </div>
//               <div><label>Amount</label><input name="amount" className="input" type="number" defaultValue={editing.amount} /></div>
//               <div><label>Description</label><textarea name="description" className="input" rows="3" defaultValue={editing.description} /></div>
//               <div>
//                 <label>Status</label>
//                 <select name="status" className="input" defaultValue={editing.status}>
//                   <option value="ongoing">ongoing</option>
//                   <option value="ended">ended</option>
//                 </select>
//               </div>
              
//               <div className="flex gap-2">
//                 <button className="btn btn-primary" type="submit">Save</button>
//                 {/* সমাধান ১ (ক্যানসেল): 'Cancel' বাটনে ক্লিক করলে মডাল বন্ধ হবে */}
//                 <button type="button" className="btn btn-outline" onClick={() => setEditing(null)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function MyIssues(){
//   return (
//     <>
//       <Helmet><title>My Issues — Clean City</title></Helmet>
//       <PrivateRoute><MyIssuesInner/></PrivateRoute>
//     </>
//   );
// }




// src/pages/MyIssues.jsx

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import PrivateRoute from '../components/PrivateRoute';
import { getMyIssues, updateIssue, deleteIssue } from '../services/issues';
import { toast, confirm } from '../utils/toast'; 
import Spinner from '../components/Spinner'; // ধরে নিচ্ছি Spinner ইম্পোর্ট করা আছে

function MyIssuesInner(){
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const load = async()=> {
    setLoading(true);
    setRows(await getMyIssues());
    setLoading(false);
  };
  useEffect(()=>{ load(); },[]);

  // Update/Save ফাংশন
  const onSave = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get('title'),
      category: fd.get('category'),
      amount: Number(fd.get('amount')),
      description: fd.get('description'),
      status: fd.get('status')
    };
    try{ 
      await updateIssue(editing._id, payload); 
      toast('success','Issue updated'); 
      setEditing(null); 
      load(); 
    }catch(e){ 
      toast('error',e.message); 
    }
  };

  // Delete ফাংশন
  const onDelete = async (id) => {
    if (await confirm('Delete this issue permanently?')) {
      try{ 
        await deleteIssue(id); 
        toast('success','Issue deleted'); 
        load();
      }catch(e){ 
        toast('error', e.message); 
      }
    }
  };

  return (
    <div className="card">
      {/* সমাধান ১: রেসপন্সিভ টেবিল */}
      <div className="overflow-x-auto"> 
        
        {loading && <div className="p-8 text-center">Loading issues...</div>}

        {!loading && rows.length === 0 && (
            <div className="p-8 text-center text-gray-500">You have not submitted any issues yet.</div>
        )}

        {!loading && rows.length > 0 && (
          <table className="w-full text-sm min-w-max"> {/* <-- min-w-max যোগ করা হয়েছে */}
            <thead>
              <tr className="text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r=> (
                <tr key={r._id} className="border-t border-slate-200 dark:border-slate-800">
                  {/* ছোট স্ক্রিনের জন্য truncate এবং max-width ব্যবহার করা হয়েছে */}
                  <td className="p-2 max-w-[120px] truncate">{r.title}</td> 
                  <td className="p-2 whitespace-nowrap">{r.category}</td>
                  <td className="p-2">৳ {r.amount}</td>
                  <td className="p-2 whitespace-nowrap">{r.status}</td>
                  <td className="p-2 space-x-2 whitespace-nowrap">
                    <button className="btn btn-outline text-xs" onClick={()=>setEditing(r)}>Update</button>
                    <button className="btn btn-primary text-xs" onClick={()=>onDelete(r._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== সমাধান ২: আপডেট মডাল (ফুটার ফিক্স) ===== */}
      {editing && (
        <div 
          // Z-index বাড়ানো হয়েছে (z-50) এবং বাইরে ক্লিক করলে বন্ধ হবে
          onClick={() => setEditing(null)} 
          className="fixed inset-0 bg-black/50 p-4 z-50 overflow-y-auto flex justify-center items-start" 
        >
          <div 
            // মডালের ভেতরে ক্লিক করলে বন্ধ হবে না, উপরে সামান্য মার্জিন দেওয়া হয়েছে
            onClick={(e) => e.stopPropagation()} 
            className="card max-w-xl w-full mt-10 relative"
          >
            <h3 className="text-lg font-semibold mb-4">Update Issue</h3>
            <form onSubmit={onSave} className="grid gap-3">
              {/* ফর্ম ফিল্ডগুলো... */}
              <div><label className="label">Title</label><input name="title" className="input" defaultValue={editing.title} /></div>
              <div>
                <label className="label">Category</label>
                <select name="category" className="input" defaultValue={editing.category}>
                  {['Garbage','Illegal Construction','Broken Public Property','Road Damage'].map(c=> <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className="label">Amount</label><input name="amount" className="input" type="number" defaultValue={editing.amount} /></div>
              <div><label className="label">Description</label><textarea name="description" className="input" rows="3" defaultValue={editing.description} /></div>
              <div>
                <label className="label">Status</label>
                <select name="status" className="input" defaultValue={editing.status}>
                  <option value="ongoing">ongoing</option>
                  <option value="ended">ended</option>
                </select>
              </div>
              
              {/* বাটন সেকশন: নিচে আলাদা জায়গা করে দেওয়া হলো */}
              <div className="flex gap-2 justify-end pt-4 border-t mt-4">
                <button type="button" className="btn btn-outline" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MyIssues(){
  return (
    <>
      <Helmet><title>My Issues — Clean City</title></Helmet>
      <PrivateRoute><MyIssuesInner/></PrivateRoute>
    </>
  );
}