import { Toaster } from '@/components/ui/toaster'
import { getAllCategories } from '@/core/redux/slices/category_slice';
import { fetchCourses } from '@/core/redux/slices/course_slice';
import { AppDispatch, RootState } from '@/core/redux/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'

const Admin_dashboard :React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const currentUser = useSelector((state: RootState) => state.users.user)
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(fetchCourses());
        dispatch(getAllCategories())
      }, [dispatch]);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">Admin Panel</div>
        <nav className="flex flex-col space-y-2 p-4">
            <Link to="/adminDashboard" className="hover:bg-gray-700 p-2 rounded">
                Dashboard
            </Link>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="w-full text-left hover:bg-gray-700 p-2 rounded flex justify-between items-center"
                >
                    Courses
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                        <Link to="/adminDashboard/courses" className="block hover:bg-gray-700 p-2 rounded">
                            Courses
                        </Link>
                        <Link to="/adminDashboard/categories" className="block hover:bg-gray-700 p-2 rounded">
                            Categories
                        </Link>
                        <Link to="/adminDashboard/instructor" className="block hover:bg-gray-700 p-2 rounded">
                            Instructors
                        </Link>
                    </div>
                )}
            </div>
            <Link to="/adminDashboard/users" className="hover:bg-gray-700 p-2 rounded">
                Users
            </Link>
        </nav>
    </aside>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
            <div className="text-lg font-bold">Admin Dashboard</div>
            <div>
                <span className="text-gray-600">Welcome {currentUser?.name}</span>
            </div>
            <button onClick={()=>{
                 localStorage.removeItem('user')
                 window.location.reload()}}
                 className="bg-red-500 rounded hover:bg-red-600 font-semibold  text-white p-2" >
                Logout
            </button>
        </header>

        {/* Main Content */}
        <main className="p-6 bg-gray-100 flex-1">
            <Outlet />
        </main>
    </div>
    <Toaster/>
</div>
  )
}

export default Admin_dashboard
