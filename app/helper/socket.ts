import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:4000", {
  autoConnect: false,
  withCredentials: true,
});

export const joinChat = (data: {
  socket: Socket;
  chatName: string;
  chatId: unknown;
  username: string;
  message: string;
}) => {
  socket.emit(process.env.JOIN_PRIVATE_CHAT!, data.chatId); // this allow to join a private chat
};
export const sendMessage = (data: {
  chatId: number;
  message: string;
  username: string;
}) => {
  socket.emit("send-message", {
    chatId: 1,
    username: data.username,
    message: data.message,
  }); // this allow to send message to other user
};
