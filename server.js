//server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cheerio = require("cheerio");

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

  socket.on("get chat history", (placeName) => {
    Chat.find({ place: placeName })
      .sort("-timestamp")
      .limit(10)
      .then((chats) => {
        socket.emit("chat history", chats);
      })
      .catch((err) => console.error("Failed to load chats", err));
  });

  Chat.find({})
    .sort("-timestamp")
    .limit(10)
    .then((chats) => {
      socket.emit("chat history", chats);
    })
    .catch((err) => console.error("Failed to load chats", err));

  socket.on("chat message", (data) => {
    console.log("nickname: ", data.nickname);
    console.log("message: ", data.message);
    console.log("place: ", data.placeName);

    const chat = new Chat({
      nickname: data.nickname,
      message: data.message,
      timestamp: data.timestamp,
      place: data.placeName,
    });
    chat
      .save()
      .then(() => console.log("Chat saved"))
      .catch((err) => console.error("Failed to save chat", err));

    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(bodyParser.json());
app.use(cors());

const password = "dbtjdch366!"; // 몽고 디비 패스워드

// 몽고디비 연결 설정n
const user = "kkhs1kim";
const dbName = "mydatabase";

const mongoURL = `mongodb+srv://${user}:${encodeURIComponent(password)}@kkhs1kim.jfdcs8g.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected:", mongoURL);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 4000;

//스키마
////////////////////////////////////////////////////////////////////////////////////////

const UserSchema = new mongoose.Schema({
  nickname: String,
});
const User = mongoose.model("User", UserSchema);

const ChatSchema = new mongoose.Schema({
  nickname: String,
  message: String,
  timestamp: Date,
  place: String,
});
const Chat = mongoose.model("Chat", ChatSchema);

const ReviewSchema = new mongoose.Schema({
  nickname: String,
  review: String,
  timestamp: Date,
  place: String,
});
const Review = mongoose.model("Review", ReviewSchema);

////////////////////////////////////////////////////////////////////////////////////////

// 사용자 정보 저장 API
app.post("/api/saveUserInfo", async (req, res) => {
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

////////////////////////////////////////////////////////////////////////////////////////

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

app.get("/kaistmaru", async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch(
    "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=fclt"
  );
  let body = await response.text();
  body = body.replace(/<br\s*\/?>/gm, "\n");
  const $ = cheerio.load(body);
  const breakfast = $(
    "#tab_item_1 > table > tbody > tr > td:nth-child(1)"
  ).text();
  const lunch = $("#tab_item_1 > table > tbody > tr > td:nth-child(2)").text();
  const dinner = $("#tab_item_1 > table > tbody > tr > td:nth-child(3)").text();
  res.json({ breakfast, lunch, dinner });
});

app.get("/professor", async (req, res) => {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch(
    "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=emp"
  );
  let body = await response.text();
  body = body.replace(/<br\s*\/?>/gm, "\n");
  const $ = cheerio.load(body);
  const breakfast = $(
    "#tab_item_1 > table > tbody > tr > td:nth-child(1)"
  ).text();
  const lunch = $("#tab_item_1 > table > tbody > tr > td:nth-child(2)").text();
  const dinner = $("#tab_item_1 > table > tbody > tr > td:nth-child(3)").text();
  res.json({ breakfast, lunch, dinner });
});

////////////////////////////////////////////////////////////////////////////////////////


app.post("/api/saveReview", async (req, res) => {
  const { nickname, review, place } = req.body;

  try {
    const reviewRecord = new Review({ nickname, review, timestamp: new Date(), place });
    await reviewRecord.save();
    res.json({ message: "Review saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save review" });
  }
});

app.get("/api/getReviews/:place", async (req, res) => {
  const { place } = req.params;

  try {
    const reviews = await Review.find({ place }).sort("-timestamp");
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get reviews" });
  }
});


////////////////////////////////////////////////////////////////////////////////////////

server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
