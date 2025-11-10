
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { toast } from '../utils/toast';
import { createIssue } from '../services/issues';
import PrivateRoute from '../components/PrivateRoute';
import Spinner from '../components/Spinner';

function AddIssueForm() {
  const { user, loading } = useAuth();
  
  
  const defaultValues = {
    status: 'ongoing',
    category: 'Garbage', 
    title: '',
    location: '',
    image: '',
    description: '',
    amount: ''
  };

  const { register, handleSubmit, reset } = useForm({ defaultValues });

  if (loading) return <Spinner />;
  if (!user) return null;

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
        date: new Date(),
        email: user?.email || ''
      };
      
      await createIssue(payload);
      toast('success', 'Issue reported successfully!');
      
      
      reset(defaultValues); 
      

    } catch (e) {
      toast('error', e.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto card">
      <h2 className="text-xl font-bold mb-3">Add Issue</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        
        <div>
          <label className="label">Issue Title</label>
          <input className="input" {...register('title', { required: true })} />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Category</label>
            <select className="input" {...register('category', { required: true })}>
              {['Garbage', 'Illegal Construction', 'Broken Public Property', 'Road Damage'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" {...register('location', { required: true })} />
          </div>
        </div>

        <div>
          <label className="label">Image URL</label>
          <input className="input" {...register('image', { required: true })} placeholder="https://" />
        </div>
        
       
        <div>
          <label className="label">Description</label>
          <textarea className="input" rows="4" {...register('description', { required: true })}></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Amount (Suggested Budget)</label>
            <input className="input" type="number" {...register('amount', { required: true, min: 1 })} />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" {...register('status')}>
              <option value="ongoing">ongoing</option>
              <option value="ended">ended</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Email</label>
          <input className="input" value={user?.email || ''} readOnly />
        </div>
        
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default function AddIssue() {
  return (
    <>
      <Helmet><title>Add Issue — Clean City</title></Helmet>
      <PrivateRoute><AddIssueForm /></PrivateRoute>
    </>
  );
}