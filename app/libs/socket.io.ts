import { socket } from "../helper/socket";
import { User } from "../types";

export const createSocketConnection = (user: User) => {
  try {
    if (!socket.connected) {
      socket.connect();
      socket.emit("join-private-chat", 1);

      //clear if already
      socket.off(`chat_${1}`);
      socket.on(`chat_${1}`, (data) => {
        console.log("from d", data);
      });

      //clear if error already
      socket.off("connect_error");
      socket.on("connect_error", (err) => {
        console.log("Socket connection failed:", err.message);
      });
    }
  } catch (err) {
    console.log(err);
  }

  return socket;
};
