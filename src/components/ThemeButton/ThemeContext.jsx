import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('initial');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'initial') return 'firstClick';
      if (prevTheme === 'firstClick') return 'secondClick';
      return 'initial';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};