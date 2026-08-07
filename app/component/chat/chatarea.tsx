/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { receivedMessage, sendMessage, socket } from "@/app/helper/socket";
import { useDebounce } from "@/app/hooks/useDebouce";
import { createSocketConnection } from "@/app/libs/socket.io";
import { StoreState } from "@/app/libs/store/reduxStore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const ChatArea = () => {
  const user = useSelector((store: StoreState) => store.auth.user);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="w-full h-full">
      <Chat />
    </div>
  );
};

export const Chat = () => {
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((store: StoreState) => store.auth.user);
  const debouncedText = useDebounce({ delay: 1000, text, enable: !!isEditing });
  const isTyping = useRef<boolean>(false);
  const typingTimeOut = useRef<NodeJS.Timeout | null>(null);

  //handle typing with typing indicator
  const handleTyping = ({ value }: { value: string }) => {
    const channelStopTyping = `stop-typing`;
    const channelTyping = `typing`;
    setText(value);

    if (!isTyping.current) {
      socket.emit(channelTyping, { ...user, activeChat });
      isTyping.current = true;
    }

    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);

    typingTimeOut.current = setTimeout(() => {
      socket.emit(channelStopTyping, { ...user, activeChat });
      isTyping.current = false;
    }, 1000);
  };

  // send message on debounce
  useEffect(() => {
    sendMessage({
      chatId: activeChat,
      message: debouncedText ?? "",
      username: user?.name ?? "",
    });
  }, [activeChat, debouncedText, user?.name]);

  //received message
  useEffect(() => {
    if (!user || !activeChat) return;

    createSocketConnection(user, 1);
    const message = receivedMessage(activeChat);

    setMessage({
      message: message?.message ?? "",
      username: message?.username ?? "",
    });
  }, [activeChat, user]);

  //listening to the channels
  useEffect(() => {
    if (!user) return;
    const channel = `chat_${activeChat}`;
    const channelStartTyping = `typing-${activeChat}`;
    const channelStopTyping = `stop-typing-${activeChat}`;
    socket.on(channelStartTyping, (payload) => {
      setStatusMessage(payload.message);
    });
    socket.on(channelStopTyping, (payload) => {
      setStatusMessage("");
    });

    socket.on(channel, (data) => {
      setText(data.message);
      console.log(data);
    });

    return () => {
      socket.off(channel);
    };
  }, [activeChat, user]);

  //focus to input area
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full h-full">
      {user?.name}
      <div>{isEditing ? "EDITING" : " NO EDITING"} </div>
      <div>{statusMessage}</div>
      <div
        onClick={() => {
          setIsEditing(true);
        }}
        className="border p-5"
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={text}
            className="w-full p-5 h-full"
            onChange={(e) => handleTyping({ value: e.target.value as string })}
          ></input>
        ) : (
          <span className="w-full h-full p-5">{text}</span>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Chat;
