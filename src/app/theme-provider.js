'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeToggleProvider');
  }
  return context;
};

export default function ThemeToggleProvider({ children }) {
  const [theme, setTheme] = useState(null); // null = wait until client

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const defaultTheme = storedTheme || 'dark'; // ✅ force dark by default
    
    setTheme(defaultTheme);
    
    // Apply theme to document
    if (defaultTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (theme === null) return null; // Avoid hydration mismatch

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
