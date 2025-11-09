import { Helmet } from 'react-helmet-async';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../hooks/useAuth';

function Inner(){
  const { user } = useAuth();
  return (
    <div className="card max-w-lg mx-auto text-center">
      <img className="h-16 w-16 rounded-full mx-auto" src={user.photoURL || `https://i.pravatar.cc/64?u=${user.email}`} />
      <h3 className="mt-2 font-semibold">{user.displayName||'Anonymous'}</h3>
      <p className="text-sm opacity-70">{user.email}</p>
    </div>
  );
}

export default function Profile(){
  return (
    <>
      <Helmet><title>Profile — Clean City</title></Helmet>
      <PrivateRoute><Inner/></PrivateRoute>
    </>
  );
}
