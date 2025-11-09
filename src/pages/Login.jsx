import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from '../utils/toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GooglePic from "../pic/google.png"

export default function Login(){
  const { login, loginGoogle } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || '/';

  const onSubmit = async (data) => {
    try{
      await login(data.email, data.password);
      toast('success','Welcome back!');
      nav(from, { replace: true });
    }catch(e){ toast('error', e.message); }
  };

  return (
    <div className="max-w-md mx-auto card">
      <Helmet><title>Login — Clean City</title></Helmet>
      <h2 className="text-xl font-bold mb-3">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div><label className="label">Email</label><input className="input" {...register('email',{required:true})} type="email" /></div>
        <div><label className="label">Password</label><input className="input" {...register('password',{required:true})} type="password" /></div>
        <button className="btn btn-primary w-full" type="submit">Login</button>
      </form>
      <button onClick={async()=>{try{await loginGoogle(); toast('success','Logged in with Google'); nav(from,{replace:true});}catch(e){toast('error',e.message);}}} className="btn btn-outline w-full mt-3"> <img className='w-4 mr-2' src={GooglePic} alt="" />Continue with Google</button>
      <p className="text-sm mt-3">New here? <Link to="/register" className="text-emerald-600">Register</Link></p>
    </div>
  );
}
