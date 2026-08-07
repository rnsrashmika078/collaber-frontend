/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { receivedMessage, sendMessage, socket } from "@/app/helper/socket";
import { useDebounce } from "@/app/hooks/useDebouce";
import { createSocketConnection } from "@/app/libs/socket.io";
import { StoreState } from "@/app/libs/store/reduxStore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ChatArea = () => {
  const [activeChat, setActiveChat] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [messages, setMessage] = useState<{
    username: string;
    message: string;
  }>({
    username: "",
    message: "",
  });
  const [text, setText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const user = useSelector((store: StoreState) => store.auth.user);

  const debouncedText = useDebounce({ delay: 1000, text });

  // useEffect(() => {
  //   if (!debouncedText) return;
  //   // socket.emit(`typing-${user?.id}`, user);

  //   // return () => {
  //   //   setStatusMessage("");
  //   // };
  // }, [debouncedText, user]);

  useEffect(() => {
    if (!isEditing) return;

    socket.emit("typing", { ...user, isTyping: true, activeChat });
  }, [activeChat, isEditing, user]);

  useEffect(() => {
    sendMessage({
      chatId: activeChat,
      message: debouncedText ?? "",
      username: user?.name ?? "",
    });
    // setIsEditing(false);
  }, [activeChat, debouncedText, user?.name]);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const message = formData.get("message");

    // createSocketConnection(user!, activeChat);

    sendMessage({
      chatId: activeChat,
      message: message as string,
      username: user?.name as string,
    });
  };
  const chatList = [1, 2, 3];

  useEffect(() => {
    if (!user || !activeChat) return;

    createSocketConnection(user, 1);
    const message = receivedMessage(activeChat);

    setMessage({
      message: message?.message ?? "",
      username: message?.username ?? "",
    });
  }, [activeChat, user]);

  useEffect(() => {
    if(!user)return
    console.log("User",user)
    const channel = `chat_${activeChat}`;
    const channelTyping = `typing-${activeChat}`;
    socket.on(channelTyping, (payload) => {
      if (payload.data.id === user?.id) {
        return;
      }
      setStatusMessage(payload.message);
      // console.log("PAYLOAD", payload.data.id === user?.id ? "TRUE" : "FALSE");
    });

    socket.on(channel, (data) => {
      setText(data.message);
      console.log(data);
    });

    return () => {
      socket.off(channel);
    };
  }, [activeChat, user]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing, user]);

  // if (!user) return <div>Loading..</div>;

  return (
    <div className="w-full h-full">
      {user?.name}
      {/* chat list area  */}
      {/* <div className="w-full h-full bg-red-500">
        {chatList.map((c) => (
          <div
            className={`border w-fit rounded-2xl px-2 my-2 cursor-pointer ${activeChat === c ? "bg-blue-500" : "bg-red-500"}`}
            key={c}
            onClick={() => setActiveChat(c)}
          >
            CHAT {c}
          </div>
        ))}
      </div>

      <form onSubmit={send}>
        <input placeholder="enter your message" name="message"></input>
        <button type="submit">SEND</button>
      </form> */}
      <form onSubmit={send}>
        <input placeholder="enter your message" name="message"></input>
        <button type="submit">SEND</button>
      </form>
      {isEditing ? "EDITING" : " NO EDITING"} :{statusMessage}
      <div
        onClick={(e) => {
          // if (e.target === e.currentTarget) {
          //   setIsEditing(true);
          //   console.log("IS CLICK OUTSIDE");
          //   return;
          // }
          setIsEditing(true);

          // setIsEditing(false);
          // return;
          // console.log("IS CLICK INSIDE");
          // return;
          // setIsEditing(true);
          // setIsEditing(false);
        }}
        className="border p-5"
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={text}
            className="w-full p-5 h-full"
            onChange={(e) => setText(e.target.value)}
          ></input>
        ) : (
          <span className="w-full h-full p-5">{text}</span>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default ChatArea;
