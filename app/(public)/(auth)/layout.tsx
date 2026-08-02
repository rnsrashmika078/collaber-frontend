import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-5 h-screen w-screen">{children}</div>;
};

export default AuthLayout;
