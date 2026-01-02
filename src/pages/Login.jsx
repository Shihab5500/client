


import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from '../utils/toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GooglePic from "../pic/google.png"

export default function Login() {
  const { login, loginGoogle } = useAuth();
  const { register, handleSubmit, setValue } = useForm();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || '/dashboard'; 

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast('success', 'Welcome back!');
      nav(from, { replace: true });
    } catch (e) {
      toast('error', 'Login failed: ' + e.message);
    }
  };

  // ডেমো ক্রেডেনশিয়াল ফিলাপ করার ফাংশন
  const fillCredential = (email, password) => {
    setValue('email', email);
    setValue('password', password);
    toast('info', 'Credentials Auto-filled! Now click Login.');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Helmet><title>Login — Clean City</title></Helmet>
      
      <div className="card w-full max-w-md bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 p-8">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Enter your credentials to access your account</p>
        </div>

        {/* Demo Buttons Section */}
        <div className="flex gap-3 mb-6">
            <button 
                onClick={() => fillCredential('demo@user.com', 'Demo1234')} 
                className="btn btn-sm flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none hover:bg-emerald-100 hover:text-emerald-700"
            >
                👤 Demo User
            </button>
            <button 
                onClick={() => fillCredential('demo@admin.com', 'Demo1234')} 
                className="btn btn-sm flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-none hover:bg-blue-100 hover:text-blue-700"
            >
                🛡️ Demo Admin
            </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label font-medium">Email Address</label>
            <input 
                className="input w-full" 
                {...register('email', { required: true })} 
                type="email" 
                placeholder="name@example.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
                <label className="label font-medium">Password</label>
                <a href="#" className="label text-xs text-emerald-600 hover:underline">Forgot password?</a>
            </div>
            <input 
                className="input w-full" 
                {...register('password', { required: true })} 
                type="password" 
                placeholder="••••••••"
            />
          </div>

          <button className="btn btn-primary w-full text-lg mt-2" type="submit">
            Sign In
          </button>
        </form>

        <div className="divider my-6 text-xs text-slate-400">OR CONTINUE WITH</div>

        <button 
            onClick={async () => {
                try {
                    await loginGoogle();
                    toast('success', 'Logged in with Google');
                    nav(from, { replace: true });
                } catch (e) {
                    toast('error', e.message);
                }
            }} 
            className="btn btn-outline w-full flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800"
        > 
            <img className='w-5' src={GooglePic} alt="Google" />
            <span>Google</span>
        </button>

        <p className="text-center text-sm mt-8 text-slate-500">
            Don't have an account? <Link to="/register" className="text-emerald-600 font-semibold hover:underline">Create account</Link>
        </p>
      </div>
    </div>
  );
}