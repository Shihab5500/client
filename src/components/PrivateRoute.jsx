import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from './Spinner';

export default function PrivateRoute({ children }){
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Spinner/>;
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return children;
}
