// ThemeProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({
  theme: lightTheme,
  darkMode: false,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('sons-stack-dark');
    return stored ? stored === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('sons-stack-dark', darkMode);
  }, [darkMode]);

  const value = {
    theme: darkMode ? darkTheme : lightTheme,
    darkMode,
    toggleTheme: () => setDarkMode((m) => !m),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
