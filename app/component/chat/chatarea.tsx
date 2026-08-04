"use client";

import { sendMessage } from "@/app/helper/socket";
import { StoreState } from "@/app/libs/store/reduxStore";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

const ChatArea = () => {
  const username = useSelector((store: StoreState) => store.auth.user?.name);
  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const message = formData.get("message");

    sendMessage({
      chatId: 1,
      message: message as string,
      username: username!,
    });
  };
  const [activeChat, setActiveChat] = useState<number>(1);
  return (
    <div>
      <div className="flex w-full">
        {/* chat list */}
        <div className="border w-fit rounded-2xl px-2 my-2 bg-red-500">
          CHAT 1
        </div>
        <div className="border w-fit rounded-2xl px-2 my-2 bg-red-500">
          CHAT 2
        </div>
        <div className="border w-fit rounded-2xl px-2 my-2 bg-red-500">
          CHAT 3
        </div>
      </div>
      <form onSubmit={send}>
        <input placeholder="enter your message" name="message"></input>
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

export default ChatArea;
