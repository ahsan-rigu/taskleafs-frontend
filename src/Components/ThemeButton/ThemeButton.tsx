import React from "react";
import "./ThemeButton.css";

const ThemeButton = () => {
  const value: boolean = Boolean(localStorage.getItem("darkMode"));

  const setTheme = (e: { target: { checked: boolean } }) => {
    if (e.target.checked) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.setItem("darkMode", "");
    }
  };

  return (
    <label className="switch">
      <input
        title="change-theme"
        type="checkbox"
        defaultChecked={value}
        onChange={setTheme}
        className="theme-button"
      />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeButton;
