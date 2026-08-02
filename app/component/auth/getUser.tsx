"use client";

import { api } from "@/app/libs/axios";
import { memo, useEffect } from "react";

const GetUser = memo(() => {
  const requestUser = async () => {
    const res = await api.get("/auth/user");
    console.log(res.data);
  };
  console.log("RENDER");
  useEffect(() => {
    requestUser();
  }, []);
  return null;
});
GetUser.displayName = "GetUser";

export default GetUser;
