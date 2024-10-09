import { ModeToggle } from '@/components/atoms/mode-toggle';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster'
import { RootState } from '@/core/redux/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const Admin_dashboard :React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const currentUser = useSelector((state: RootState) => state.users.user)

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <aside className="w-64 border-r-2 border-slate-300">
        <div className="p-4 text-xl font-bold">Admin Panel</div>
        <nav className="flex flex-col space-y-2 p-4 ">
            <Link to="/admin" className="hover:bg-blue-600 p-2 rounded">
                Dashboard
            </Link>
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="w-full text-left hover:bg-blue-600 p-2 rounded flex justify-between items-center"
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
                        <Link to="/admin/courses" className="block hover:bg-blue-600 p-2 rounded">
                            Courses
                        </Link>
                        <Link to="/admin/categories" className="block hover:bg-blue-600 p-2 rounded">
                            Categories
                        </Link>
                        <Link to="/admin/instructor" className="block hover:bg-blue-600 p-2 rounded">
                            Instructors
                        </Link>
                    </div>
                )}
            </div>
            <Link to="/admin/users" className="hover:bg-blue-600 p-2 rounded">
                Users
            </Link>
        </nav>
    </aside>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className=" shadow p-3 px-5 border-b-2 border-b-slate-300 flex justify-between items-center">
            <div className="text-lg font-bold ">Admin Dashboard</div>
            <div>
                <span className="text-xl font-semibold">Welcome {currentUser?.name}</span>
            </div>
            <div className='flex gap-2'>
            <Link to={'/'} className='p-2'>Home</Link>
            <ModeToggle/>
            <Button onClick={()=>{
                 localStorage.removeItem('user')
                 window.location.reload()}}
                 className=" font-semibold  text-white p-2" >
                Logout
            </Button>
            </div>
            
        </header>

        {/* Main Content */}
        <main className="p-6 flex-1">
            <Outlet />
        </main>
    </div>
    <Toaster/>
</div>
  )
}

export default Admin_dashboard
