/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Theme = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), [mounted]);

  if (!mounted) return null;
  return (
    <button
      className="fixed bottom-5 right-5"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
    </button>
  );
};

export default Theme;
