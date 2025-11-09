import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllIssues from './pages/AllIssues';
import AddIssue from './pages/AddIssue';
import IssueDetails from './pages/IssueDetails';
import MyIssues from './pages/MyIssues';
import MyContributions from './pages/MyContributions';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';

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
      { path: 'add-issue', element: <PrivateRoute><AddIssue /></PrivateRoute> },
      { path: 'my-issues', element: <PrivateRoute><MyIssues /></PrivateRoute> },
      { path: 'my-contributions', element: <PrivateRoute><MyContributions /></PrivateRoute> },
      { path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> }
    ]
  },
  { path: '*', element: <NotFound /> }
]);

export default router;
