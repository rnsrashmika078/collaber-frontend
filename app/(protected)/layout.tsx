import { ReactNode } from "react";
import { Sidebar } from "../component/sidebar/sidebar";
import GetUser from "../component/auth/getUser";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white h-full w-full">
      <GetUser />
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex-4 bg-green-500">HI THERE</div>
      </div>
    </div>
  );
};

export default layout;
