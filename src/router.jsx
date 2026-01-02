

import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllIssues from './pages/AllIssues';
import IssueDetails from './pages/IssueDetails';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';

// Dashboard Pages
import DashboardHome from './pages/DashboardHome';
import AddIssue from './pages/AddIssue';
import MyIssues from './pages/MyIssues';
import MyContributions from './pages/MyContributions';
import Profile from './pages/Profile';
import ManageIssues from './pages/ManageIssues'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'issues', element: <AllIssues /> },
      { path: 'issues/:id', element: <PrivateRoute><IssueDetails /></PrivateRoute> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ]
  },
  // Dashboard Routes
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'add-issue', element: <AddIssue /> },
      { path: 'my-issues', element: <MyIssues /> },
      { path: 'manage-issues', element: <ManageIssues /> }, 
      { path: 'my-contributions', element: <MyContributions /> },
      { path: 'profile', element: <Profile /> },
    ]
  },
  { path: '*', element: <NotFound /> }
]);

export default router;