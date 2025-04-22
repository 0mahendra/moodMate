import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();
    useEffect(() => {
        if (theme === "light") {
          document.body.className = "bg-white text-black";
        } else if (theme === "dark") {
          document.body.className = "bg-gray-900 text-white";
        }
      }, [theme]);

      const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"; // Toggle between light and dark
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // Save to localStorage
      };
    
      // Retrieve theme from localStorage on initial load
      useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      }, []);  

     return (
        <>
          
            <header class={` body-font bg-transparent`}>
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center  mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">MoodMate</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
  <button 
    className="mr-5 hover:border-2 pl-2 pr-2 rounded" 
    onClick={() => navigate("/")}
  >
    Home
  </button>
  <button 
    className="mr-5 hover:border-2 pl-2 pr-2 rounded" 
    onClick={() => navigate("/entries")}
  >
    My Entries
  </button>
</nav>
    <button
          className="inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:border-2 rounded text-base mt-4 md:mt-0"
          onClick={toggleTheme} 
        >
          Switch Theme
           
        </button>
  </div>
</header>
        </>
     )
}

export default Header;