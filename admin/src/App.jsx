import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar'

import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import { assets } from './assets/assets';

const NavbarComponent = () => (
  <div className='flex justify-between items-center px-4 py-3 bg-white border-b border-gray-200'>
    <div className='flex items-center gap-2'>
      <img src={assets.logo} className='w-28' alt="" />
      <span className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full font-medium">Admin Panel</span>
    </div>
  </div>
)

const App = () => {
  const [page, setPage] = useState('AddJob')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // specific logic to catch token from URL (passed from client)
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      localStorage.setItem('recruiter-token', token);
      // Clean URL
      window.history.replaceState({}, document.title, "/");
    }
    setLoading(false)
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>

  return (
    <div className='bg-[#F8F9FD] min-h-screen font-outfit'>
      <ToastContainer />
      <NavbarComponent />
      <div className='flex'>
        <Sidebar page={page} setPage={setPage} />
        <div className='flex-1 p-6 overflow-y-auto h-[calc(100vh-65px)]'>
          {page === 'AddJob' && <AddJob />}
          {page === 'ManageJobs' && <ManageJobs />}
          {page === 'ViewApplications' && <ViewApplications />}
        </div>
      </div>
    </div>
  )
}

export default App
