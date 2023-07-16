const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const password = "dbtjdch366!"; // 몽고 디비 패스워드

// 몽고디비 연결 설정
const user = "kkhs1kim";
const dbName = "mydatabase";

const mongoURL = `mongodb+srv://${user}:${encodeURIComponent(password)}@kkhs1kim.jfdcs8g.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected:", mongoURL);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// const UserSchema = new mongoose.Schema({
//   nickname: String,
// });
// const User = mongoose.model('User', UserSchema);

// // 사용자 정보 저장 API
// app.post('/api/saveUserInfo', (req, res) => {
//   console.log('됨');
//   const { nickname } = req.body;
//   const user = new User({ nickname });
//   user.save((err, savedUser) => {
//     if (err) {
//       console.error('ERROR@!!!!!!', err);
//       res.status(500).json({ error: 'Failed to save user info' });
//     } else {
//       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//       res.json({ message: 'User info saved successfully' });
//     }
//   });
// });


const UserSchema = new mongoose.Schema({
    nickname: String,
  });
  const User = mongoose.model('User', UserSchema);
  
  // 사용자 정보 저장 API
  app.post('/api/saveUserInfo', async (req, res) => {
    console.log('됨');
    const { nickname } = req.body;
    const user = new User({ nickname });
    try {
      await user.save();
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json({ message: 'User info saved successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save user info' });
    }
    
  });
// 리디렉션 처리를 위한 라우트 설정
app.get('/api/success', (req, res) => {
    console.log("API SUCCESS!!!");
  // 리디렉션 성공 페이지로 이동
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('/api/failure', (req, res) => {
    console.log("API FAILURE!!!");

  // 리디렉션 실패 페이지로 이동
  res.sendFile(path.join(__dirname, 'public', 'failure.html'));
});

// 정적 파일 서비스 설정
app.use(express.static('public'));

// 모든 경로에 대해 리디렉션 처리
app.get('*', (req, res) => {
  res.redirect('/api/failure');
});

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());


// mongoose.connect('mongodb+srv://kkhs1kim:dbtjdch366!@kkhs1kim.jfdcs8g.mongodb.net/kkhs1kim?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const UserSchema = new mongoose.Schema({
//   nickname: String,
// });
// const User = mongoose.model('User', UserSchema);


// // 사용자 정보 저장 API
// app.post('/api/saveUserInfo', (req, res) => {
//     console.log('됨');
//   const { nickname} = req.body;
//   const user = new User({ nickname});
//   user.save((err, savedUser) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to save user info' });
//     } else {
//       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//       res.json({ message: 'User info saved successfully' });
//     }
//   });
// });x

// // 리디렉션 처리를 위한 라우트 설정
// app.get('/api/success', (req, res) => {
//   // 리디렉션 성공 페이지로 이동
//   res.sendFile(path.join(__dirname, 'public', 'success.html'));
// });

// app.get('/api/failure', (req, res) => {
//   // 리디렉션 실패 페이지로 이동
//   res.sendFile(path.join(__dirname, 'public', 'failure.html'));
// });

// // 정적 파일 서비스 설정
// app.use(express.static('public'));

// // 모든 경로에 대해 리디렉션 처리
// app.get('*', (req, res) => {
//   res.redirect('/api/failure');
// });


// 서버 시작
// app.listen(4000, () => {
//     // 몽고디비 연결 URL 출력
//     console.log
//     const mongoURL = `mongodb://${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`;
//     console.log('Server listening on port 4000');
//     console.log('MongoDB connected:', mongoURL);
// });