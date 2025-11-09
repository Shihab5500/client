import { Link } from 'react-router-dom';
export default function NotFound(){
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="opacity-80 mt-2">We couldn't find the page you're looking for.</p>
      <Link to="/" className="btn btn-primary mt-4">Back Home</Link>
    </div>
  );
}
