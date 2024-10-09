import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../atoms/mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../atoms/Logo";
import { useSelector } from "react-redux";
import { RootState } from "@/core/redux/store";
import { selectIsLoggedIn } from "@/core/redux/slices/user_slice";

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const naviagte = useNavigate();
  const currentUser = useSelector((state:RootState)=>state.users.user)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleScroll = () => {
      if (navbarRef.current) {
        const sticky = navbarRef.current.offsetTop;
        setIsFixed(window.pageYOffset > sticky);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check
    handleScroll();
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  return (
    
    <nav
      ref={navbarRef}
      className={`w-full tra flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 h-14 shadow-sm shadow-slate-500 transition-all duration-300 ease-in-out overflow-x-hidden ${
        isFixed ? "fixed top-0 left-0 w-full z-50" : ""
      } bg-white dark:bg-[#050914]`} // Set background color to white (or any other color)
    >
      <Link
        to="/"
        className={`transition-all duration-300 ease-in-out ${isSearchOpen && isMobile ? "hidden" : ""
          }`}
      >
        <div className="flex items-center"> 
          <Logo width="150px" className="sm:w-32 md:w-40 lg:w-48" />
        </div>
      </Link>

        {/* Search Input with Right to Left Animation */}
        <div
          ref={searchRef}
          className={`relative flex-grow transition-all space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 duration-500 ease-in-out overflow-hidden ${isSearchOpen ? "max-w-full" : "max-w-0"
            }`}
          style={{ position: "relative" }}
        >
          <input
            type="text"
            id="search"
            placeholder="Search Courses"
            className={`bg-transparent border border-gray-300 h-8 rounded-full pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-indigo-300 w-full transition-all duration-500 ease-in-out ${isSearchOpen ? "opacity-100" : "opacity-0"
              }`}
            style={{
              transform: isSearchOpen ? "translateX(0)" : "translateX(100%)", // Slide from right to left
              transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
          />
        </div>
        
      
      <div className="flex gap-4 items-center">
      <svg
        onClick={toggleSearch}
        className="cursor-pointer h-8 w-8 dark:bg-[#050914] hover:bg-gray-200 bg-slate-100 rounded-full text-blue-800 p-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35m1.05-4.65a7.5 7.5 0 10-15 0 7.5 7.5 0 0015 0z"
        ></path>
      </svg>

      <ModeToggle/>

      {/* User or Sign In Button */}
      
      {currentUser ? <Link to={'/user'}>{currentUser?.name}</Link> 
      :
      <Button onClick={()=>naviagte('/signin')} className="text-white font-bold">Signin</Button>
      }
      
      </div>
      {/* Search Icon */}
      
    </nav>
  );
};

export default Navbar;
