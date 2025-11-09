import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from '../utils/toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Register(){
  const { register: reg } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async ({ name, email, photoURL, password }) => {
    if (!/[A-Z]/.test(password)) return toast('error','Password needs an Uppercase letter');
    if (!/[a-z]/.test(password)) return toast('error','Password needs a Lowercase letter');
    if (password.length<6) return toast('error','Password must be at least 6 characters');
    try{
      await reg({ name, email, password, photoURL });
      toast('success','Account created');
      nav('/');
    }catch(e){ toast('error', e.message); }
  };

  return (
    <div className="max-w-md mx-auto card">
      <Helmet><title>Register — Clean City</title></Helmet>
      <h2 className="text-xl font-bold mb-3">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div><label className="label">Name</label><input className="input" {...register('name',{required:true})} /></div>
        <div><label className="label">Email</label><input className="input" type="email" {...register('email',{required:true})} /></div>
        <div><label className="label">photoURL</label><input className="input" {...register('photoURL')} placeholder="https://" /></div>
        <div><label className="label">Password</label><input className="input" type="password" {...register('password',{required:true})} /></div>
        <button className="btn btn-primary w-full" type="submit">Create Account</button>
      </form>
      <p className="text-sm mt-3">Already have an account? <Link to="/login" className="text-emerald-600">Login</Link></p>
    </div>
  );
}
