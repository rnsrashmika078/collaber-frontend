"use client";
import { StoreState } from "@/app/libs/store/reduxStore";
import { memo, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../libs/socket.io";
const SocketProvider = memo(({ children }: { children: ReactNode }) => {
  const user = useSelector((store: StoreState) => store.auth.user);

  useEffect(() => {
    if (!user) return;
    // createSocketConnection(user);
  }, [user]);

  return children;
});
SocketProvider.displayName = "SocketProvider";

export default SocketProvider;
