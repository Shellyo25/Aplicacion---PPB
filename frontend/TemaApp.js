import React, { createContext, useState } from 'react';

export const TemaApp = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <TemaApp.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </TemaApp.Provider>
  );
};