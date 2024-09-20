import { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
function App() {
  const socket = io("http://localhost:4000/");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => [console.log("disconnected")]);

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <></>;
}

export default App;
