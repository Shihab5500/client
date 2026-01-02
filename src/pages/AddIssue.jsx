


import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../utils/toast';
import { createIssue } from '../services/issues';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddIssue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  
  const defaultValues = {
    title: '',
    category: 'Garbage', 
    location: '',
    image: '',
    description: '',
    amount: ''
  };

  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
        status: 'ongoing', 
        name: user?.displayName, 
        email: user?.email 
      };
      
      await createIssue(payload);
      toast('success', 'Issue reported successfully!');
      reset(defaultValues); 
      navigate('/dashboard/my-issues'); 
    } catch (e) {
      toast('error', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet><title>Add New Issue — Clean City</title></Helmet>
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Report an Issue</h2>
        <p className="text-slate-500">Fill in the details below to alert the community and authorities.</p>
      </div>

      <div className="card bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label font-semibold">Issue Title</label>
              <input 
                type="text" 
                placeholder="Ex: Garbage pile at Mirpur 10" 
                className="input w-full bg-slate-50 dark:bg-slate-950" 
                {...register('title', { required: true })} 
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label font-semibold">Category</label>
              <select className="input w-full bg-slate-50 dark:bg-slate-950 cursor-pointer" {...register('category', { required: true })}>
                {['Garbage', 'Illegal Construction', 'Broken Public Property', 'Road Damage'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label font-semibold">Image URL</label>
              <input 
                type="url" 
                placeholder="https://image-link.com/..." 
                className="input w-full bg-slate-50 dark:bg-slate-950" 
                {...register('image', { required: true })} 
              />
              <span className="text-xs text-slate-400 mt-1">Please provide a direct image link (Unsplash/ImgBB)</span>
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold">Location Details</label>
              <input 
                type="text" 
                placeholder="Ex: Road 5, Block C, Uttara" 
                className="input w-full bg-slate-50 dark:bg-slate-950" 
                {...register('location', { required: true })} 
              />
            </div>
          </div>

         
          <div className="form-control w-full">
            <label className="label font-semibold">Detailed Description</label>
            <textarea 
              rows="4" 
              placeholder="Describe the issue in detail..." 
              className="input h-auto py-3 w-full bg-slate-50 dark:bg-slate-950" 
              {...register('description', { required: true })}
            ></textarea>
          </div>

          
          <div className="grid md:grid-cols-2 gap-6">
             <div className="form-control w-full">
              <label className="label font-semibold">Suggested Budget (৳)</label>
              <input 
                type="number" 
                placeholder="Ex: 5000" 
                className="input w-full bg-slate-50 dark:bg-slate-950" 
                {...register('amount', { required: true, min: 1 })} 
              />
            </div>
            <div className="form-control w-full">
               <label className="label font-semibold">Date</label>
               <input 
                 type="text" 
                 value={new Date().toLocaleDateString()} 
                 readOnly 
                 className="input w-full bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-500" 
               />
            </div>
          </div>

          <div className="divider">Reporter Info</div>

          
          <div className="grid md:grid-cols-2 gap-6">
             <div className="form-control w-full">
               <label className="label font-semibold">Reporter Name</label>
               <input 
                 type="text" 
                 value={user?.displayName || 'Anonymous'} 
                 readOnly 
                 className="input w-full bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-500" 
               />
             </div>
             <div className="form-control w-full">
               <label className="label font-semibold">Email</label>
               <input 
                 type="text" 
                 value={user?.email || ''} 
                 readOnly 
                 className="input w-full bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-500" 
               />
             </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
                type="submit" 
                disabled={submitting}
                className="btn btn-primary w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all"
            >
                {submitting ? (
                    <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-sm"></span> Submitting...
                    </span>
                ) : 'Submit Report'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}