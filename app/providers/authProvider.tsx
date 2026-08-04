"use client";

import { api } from "@/app/libs/axios";
import { memo, ReactNode, useCallback, useEffect } from "react";
import { setUser } from "../libs/store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../libs/store/reduxStore";
import { AxiosError } from "axios";
const AuthProvider = memo(({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const requestUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/user");

      dispatch(setUser(res.data.user));
    } catch (err) {
      const error = err instanceof AxiosError ? err.status : "error";
      if (error === 401) {
        dispatch(setUser(null));
        await api.post("/auth/refresh");
        return;
      }
    }
  }, [dispatch]);

  useEffect(() => {
    requestUser();
  }, [requestUser]);

  return children;
});
AuthProvider.displayName = "AuthProvider";

export default AuthProvider;
