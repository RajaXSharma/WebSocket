// import { useEffect, useState } from "react";
// import "./App.css";
// import io from "socket.io-client";
// function App() {
//   const [message, setMessage] = useState("");

//   const socket = io("http://localhost:4000/");
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("connected");
//     });

//     socket.on("disconnect", () => [console.log("disconnected")]);

//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   const handleForm = (e) => {
//     e.preventDefault();
//     if (message) {
//       socket.emit("chat message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleForm}>
//         <input
//           type="text"
//           onChange={(e) => setMessage(e.target.value)}
//           value={message}
//           placeholder="enter message"
//         />
//         <button type="submit">send</button>
//       </form>
//     </>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000/");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected");
    });

    newSocket.on("chat message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    newSocket.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if (message && socket) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="enter message"
        />
        <button type="submit">send</button>
      </form>
      <div className="chat">
        {chat.map((chatMessage, index) => (
          <p key={index}>{chatMessage}</p>
        ))}
      </div>
    </>
  );
}

export default App;
