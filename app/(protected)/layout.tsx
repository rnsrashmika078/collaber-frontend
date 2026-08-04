import { ReactNode } from "react";
import { Sidebar } from "../component/sidebar/sidebar";
import AuthProvider from "../providers/authProvider";
import SocketProvider from "../providers/socketProvider";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <div className="bg-white h-full w-full">
          <div className="flex w-full h-full">
            <Sidebar />
            <div className="flex w-full h-full bg-green-500 p-5">{children}</div>
          </div>
        </div>
      </SocketProvider>
    </AuthProvider>
  );
};

export default layout;
