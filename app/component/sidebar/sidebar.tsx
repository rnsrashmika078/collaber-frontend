"use client";
import { AiFillCrown } from "react-icons/ai";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdHome } from "react-icons/io";

type SideBarContext = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};
const SidebarContext = createContext<SideBarContext | null>(null);

const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(false);

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
      <ActiveBar>
        <SidebarToggler>
          <SideBarContent />
        </SidebarToggler>
      </ActiveBar>
    </SideBarProvider>
  );
};

export const SidebarToggler = ({ children }: { children: ReactNode }) => {
  const { toggle } = useSideBarContext();

  return (
    <AnimatePresence>
      <motion.div
        className="overflow-auto h-full -10"
        initial={{ width: 300 }}
        animate={{ width: toggle ? 300 : 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export const SideBarContent = () => {
  return (
    <div className={`p-5 w-full bg-red-500 h-full`}>
      SIDE BAR CONTENT GOES HERE
    </div>
  );
};

const ActiveBar = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setToggle } = useSideBarContext();

  return (
    <div className="flex border-r border-border shadow-md">
      <div className={`p-5 h-full ${className ?? "bg-gray-900"}`}>
        <AiFillCrown
          size={25}
          className="text-icon"
          onClick={() => setToggle((prev) => !prev)}
        />
      </div>
      <div className="bg-blue-500 h-full">{children}</div>
    </div>
  );
};

export default ActiveBar;
