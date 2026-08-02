"use client";

import { api } from "@/app/libs/axios";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

const SignIn = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // const res = await fetch("/api/signIn", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": `application/json`,
    //   },
    //   body: JSON.stringify({ email, password }),
    // });
    // const result = await res.json();
    // console.log("result", result);

    const res = await api.post("/auth/login", { email, password });
    console.log(res.data);

    if (res.data.success) {
      redirect("/home");
    }
  };

  console.log(" RE RENDER");
  return (
    <div className="">
      SignIn
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col justify-center border p-5 gap-2"
      >
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          className="border rounded-2xl p-2"
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          className="border rounded-2xl p-2"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
