const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("chat message", (data) => {
    console.log("nickname: ", data.nickname);
    console.log("message: ", data.message);
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(bodyParser.json());
app.use(cors());

const mongoURL = `mongodb+srv://dbUser:1234@cluster0.58hujwe.mongodb.net/`;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected:", mongoURL);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 4000;

const UserSchema = new mongoose.Schema({
  nickname: String,
});
const User = mongoose.model("User", UserSchema);

// 사용자 정보 저장 API
app.post("/api/saveUserInfo", async (req, res) => {
  console.log("됨");
  const { nickname } = req.body;

  try {
    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = new User({ nickname });
    await user.save();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.json({ message: "User info saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user info" });
  }
});

// 사용자 정보 가져오는 API
app.get("/api/getUserInfo/:nickname", async (req, res) => {
  const { nickname } = req.params;

  try {
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user info" });
  }
});

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
