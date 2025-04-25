/* global chrome */
import { createContext, useState, useEffect, useContext } from "react";

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}

// Theme provider component
export function ThemeProvider({ children }) {
  // Get initial theme from storage or default to 'light'
  const [theme, setTheme] = useState("light");

  // Load theme from storage when component mounts
  useEffect(() => {
    chrome.storage.sync.get(["theme"], (result) => {
      if (result.theme) {
        setTheme(result.theme);
      }
    });
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Save theme to Chrome storage
    // This will trigger the content script and background service to apply the theme to all tabs
    chrome.storage.sync.set({ theme: newTheme });
  };

  // Value to be provided to consumers
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
