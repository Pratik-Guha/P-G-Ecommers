'use client'
import { useState, useEffect } from 'react';

const ThemeToggleButton = () => {
 
  const [darkMode,setdarkMode]=useState(false);

  // const toggleDarkMode=()=>{
  //   setdarkMode(!darkMode);
  // }
  useEffect(() => {
    // Check if dark mode is already enabled in local storage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setdarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setdarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button 
    className='fixed z-50 w-10 h-10 lg:left-72 left-32 md:top-4  top-2  bg-neutral-800 dark:bg-white rounded-full '
    onClick={toggleDarkMode}
    >
     {
      darkMode ? "🌞" : "🌚"
     }
    </button>
  );
};

export default ThemeToggleButton;