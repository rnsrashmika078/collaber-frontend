"use client";
import { FiSidebar } from "react-icons/fi";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SideBarContext = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const SidebarContext = createContext<SideBarContext | null>(null);

const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <SidebarContext.Provider value={{ toggle, setToggle }}>
      {children}
    </SidebarContext.Provider>
  );
};
export const useSideBarContext = () => {
  const context = useContext(SidebarContext);

  if (!context)
    throw new Error("useSideBarContext cannot use outside the SideBarProvider");

  return context;
};
export const Sidebar = () => {
  return (
    <SideBarProvider>
      <SidebarToggler>
        <SideBarContent />
      </SidebarToggler>
    </SideBarProvider>
  );
};

export const SidebarToggler = ({ children }: { children: ReactNode }) => {
  const { setToggle, toggle } = useSideBarContext();

  return (
    <>
      <FiSidebar
        className="fixed left-2 top-2"
        onClick={() => setToggle((prev) => !prev)}
      />{" "}
      <AnimatePresence>
        <motion.div
          initial={{ width: 200 }}
          animate={{ width: toggle ? 200 : 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>{" "}
      </AnimatePresence>
    </>
  );
};
export const SideBarContent = () => {
  return (
    <div className={`p-5 w-[200px] bg-red-500 h-full`}>
      SIDE BAR CONTENT GOES HERE
    </div>
  );
};
