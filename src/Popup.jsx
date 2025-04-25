import "./popup.css";
import { useTheme } from "./ThemeContext";

export default function Popup() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`popup ${theme}`}>
      <h1>Theme Toggler</h1>

      <div className="theme-toggle-container">
        <span className="toggle-label">Light</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="toggle-slider round"></span>
        </label>
        <span className="toggle-label">Dark</span>
      </div>

      <p>Current website theme: {theme}</p>
      <p className="info-text">
        This extension applies {theme} mode to all web pages.
      </p>
    </div>
  );
}
