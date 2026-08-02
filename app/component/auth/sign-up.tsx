"use client";

import { api } from "@/app/libs/axios";
import { FormEvent } from "react";

const SignUp = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    console.log({ email, name, password });

    const res = await api.post("/auth/register", { email, name, password });
    console.log(res);
  };

  console.log(" RE RENDER");
  return (
    <div className="">
      SignUp
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
          type="text"
          placeholder="Enter name"
          name="name"
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

export default SignUp;
