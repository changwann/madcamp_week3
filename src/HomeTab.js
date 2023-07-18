//HomeTab.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./HomeTab.css";
const socket = io("http://localhost:4000");

const HomeTab = ({ userName }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const nickname = userName;

  useEffect(() => {
    socket.on("chat message", (data) => {
      setChat((oldChat) => [data, ...oldChat]);
    });

    socket.on("chat history", (data) => {
      setChat([...data]);
    });

    socket.emit("get chat history");

    return () => {
      socket.off("chat message");
      socket.off("chat history");
    };
  }, []);

  const onTextChange = (e) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage === "") {
      alert("메시지를 입력하세요.");
    } else {
      const timestamp = new Date();
      socket.emit("chat message", { nickname, message, timestamp });
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "5%" }}>
      <h1>채팅</h1>
      <form onSubmit={onMessageSubmit}>
        <input
          name="message"
          onChange={(e) => onTextChange(e)}
          value={message}
          placeholder="채팅을 보내보세요!"
          style={{ width: "75%", height: "20px" }}
        />
        <button style={{ width: "23%", height: "26px" }}>전송</button>
      </form>
      {chat.map((msg, idx) => {
        if (msg.nickname === nickname) {
          return (
            <p
              key={idx}
              className="bubble-right"
              style={{ fontWeight: "bold", textAlign: "right" }}
            >
              <small style={{ color: "blue", marginRight: "10px" }}>
                {new Date(msg.timestamp).toLocaleTimeString()} -
              </small>
              {msg.message}
            </p>
          );
        } else {
          return (
            <p key={idx} className="bubble-left">
              [{msg.nickname}]<br />
              {msg.message}
              <small style={{ color: "blue", marginLeft: "10px" }}>
                - {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </p>
          );
        }
      })}
    </div>
  );
};

export default HomeTab;
