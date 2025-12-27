import { useEffect, useState } from "react";
import Button from "./Button";

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Apply theme to <html> and persist
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Button
      onClick={() => setIsDark((prev) => !prev)}
      icon={isDark ? "sunny" : "moon"}
      iconPosition="left"
      gap={2}
      aria-pressed={isDark}
      className="px-6 py-2"
      iconClassName={`transition-transform duration-300 ease-in-out 
        ${isDark ? "rotate-180 scale-110" : "rotate-0 scale-100"}
      `}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </Button>
  );
};
export default ThemeToggle;
