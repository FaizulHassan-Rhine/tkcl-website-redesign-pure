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

    const defaultTheme = storedTheme || 'light'; // ✅ Set light as default
        
    setTheme(defaultTheme);
        
    const root = document.documentElement;
        
    // CRITICAL: Clear inline styles from initial script
    root.style.removeProperty('background-color');
    root.style.removeProperty('color');
        
    // Apply theme to document
    root.classList.remove('dark', 'light');
    if (defaultTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
        
    const root = document.documentElement;
        
    // CRITICAL: Clear inline styles before applying new theme
    root.style.removeProperty('background-color');
    root.style.removeProperty('color');
        
    // Apply theme to document
    root.classList.remove('dark', 'light');
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  };

  if (theme === null) return null; // Avoid hydration mismatch

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}