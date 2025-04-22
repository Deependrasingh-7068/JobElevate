import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';

// 🔥 Import Notification Context
import { NotificationProvider } from './context/shared/NotificationContext';

// 🔥 Import ErrorBoundary
import ErrorBoundary from './components/shared/ErrorBoundary';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/jobs",
    element: <Jobs />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/browse",
    element: <Browse />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>,
    errorElement: <ErrorBoundary /> // Custom error page for this route
  },
])

function App() {
  return (
    <NotificationProvider> {/* 🔥 Wrap RouterProvider inside NotificationProvider */}
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </NotificationProvider>
  )
}

export default App;
