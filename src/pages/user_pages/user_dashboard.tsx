import { ModeToggle } from '@/components/atoms/mode-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster'
import { RootState } from '@/core/redux/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const User_dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For burger menu
  const currentUser = useSelector((state: RootState) => state.users.user);
  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar to detect outside clicks

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Close sidebar when link is clicked
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out bg-blue-950 text-white w-64 z-50 md:relative md:flex md:flex-col`}
      >
        <div className="p-4 text-xl font-bold">Welcome {currentUser?.name}</div>
        <nav className="flex flex-col space-y-2 p-4">
          <Link to="/user" className="hover:bg-gray-700 p-2 rounded" onClick={handleLinkClick}>
            Dashboard
          </Link>
          <Link to="/user/profile" className="hover:bg-gray-700 p-2 rounded" onClick={handleLinkClick}>
            Profile
          </Link>
          <Link to="/user/courses" className="hover:bg-gray-700 p-2 rounded" onClick={handleLinkClick}>
            Courses
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-100 shadow p-4 flex justify-between items-center md:hidden">
          <div className="text-lg font-bold">User Dashboard</div>
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className="p-6 dark:text-white flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className='flex justify-between'>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, {currentUser?.name}!</div>
              <div className=' flex gap-2'>
              <Link to={'/'} className='p-2'>Home</Link>
                <ModeToggle />
                <button onClick={() => {
                  localStorage.removeItem('user')
                  window.location.reload()
                }}
                  className="bg-red-500 rounded hover:bg-red-600 h-max font-semibold  text-white p-2" >
                  Logout
                </button>
                
              </div>

            </div>

            <p className="text-gray-600 dark:text-yellow-50">Here's a quick overview of your recent activity.</p>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="dark:text-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">Your Courses</h3>
                <p className="text-gray-600 dark:text-white">You are currently enrolled in 5 courses.</p>
                <Link to="/user/courses" className="text-indigo-600 hover:text-indigo-800 mt-4 block">
                  View all courses
                </Link>
              </div>

              <Card className="dark:text-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">Profile Completion</h3>
                <p className="text-gray-600 dark:text-white">Your profile is 80% complete. Add more details to complete it!</p>
                <Link to="/user/profile" className="text-indigo-600 hover:text-indigo-800 mt-4 block">
                  Complete your profile
                </Link>
              </Card>

              <div className="dark:text-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4 dark:text-white">Recent Activities</h3>
                <p className="text-gray-600 dark:text-white">You liked 3 posts and completed 2 quizzes last week.</p>
                <Link to="/user/activities" className="text-indigo-600 hover:text-indigo-800 mt-4 block">
                  View recent activities
                </Link>
              </div>
            </div>

            {/* Additional Content */}

          </div>

          <Outlet />
        </main>
      </div>

      {/* Toaster */}
      <Toaster />
    </div>
  )
}

export default User_dashboard
