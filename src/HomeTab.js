import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const HomeTab = ({ userName }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const nickname = userName;

  //   const login = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:4000/api/login", {
  //         nickname,
  //       });
  //       setNickname(response.data.nickname);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  useEffect(() => {
    socket.on("chat message", (data) => {
      setChat((oldChat) => [data, ...oldChat]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", { nickname, message });
    setMessage("");
  };

  return (
    <div>
      <h1>채팅</h1>
      <form onSubmit={onMessageSubmit}>
        <input
          name="message"
          onChange={(e) => onTextChange(e)}
          value={message}
        />
        <button>전송</button>
      </form>
      {chat.map((msg, idx) => (
        <p key={idx}>
          {msg.nickname}: {msg.message}
        </p>
      ))}
    </div>
  );
};

export default HomeTab;
