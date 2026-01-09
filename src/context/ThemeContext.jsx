import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('normal');

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const savedFontSize = localStorage.getItem('fontSize') || 'normal';
      setTheme(savedTheme);
      setFontSize(savedFontSize);
      
      // Apply theme to document
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Set specific theme
  const setThemeMode = (mode) => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  // Change font size
  const changeFontSize = (size) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
    
    // Apply font size to document
    const root = document.documentElement;
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  };

  // Check if dark mode
  const isDark = theme === 'dark';

  const value = {
    theme,
    fontSize,
    isDark,
    toggleTheme,
    setThemeMode,
    changeFontSize,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};