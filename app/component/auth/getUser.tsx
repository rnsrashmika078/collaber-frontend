"use client";
import { memo, useEffect } from "react";

const GetUser = memo(() => {
  const requestUser = async () => {
    const res = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
  };
  console.log("RENDER");
  useEffect(() => {
    requestUser();
  }, []);
  return null;
});
GetUser.displayName = "GetUser";

export default GetUser;
