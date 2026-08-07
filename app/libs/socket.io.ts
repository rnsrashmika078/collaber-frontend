import { socket } from "../helper/socket";
import { User } from "../types";
// let currentChannel: string | null = null;

export const createSocketConnection = (user: User, chatId: number) => {
  try {
    if (!socket.connected) {
      socket.connect();
    }
    const channel = `chat_${chatId}`;

    // if (currentChannel) {
    //   socket.off(currentChannel);
    // }

    socket.emit("switch-private-chat", chatId);

    // get coming messages
    // socket.on(channel, (data) => {
    //   console.log("message", data);
    // });

    // currentChannel = newChannel;

    socket.off("connect_error");
    socket.on("connect_error", (err) => {
      console.log("Socket connection failed:", err.message);
    });

    return () => {
      socket.off(channel);
    };
  } catch (err) {
    console.log(err);
  }

  console.log(socket);
  return socket;
};
