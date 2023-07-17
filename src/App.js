import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";

const App = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("82e2e8490760bfb5909f078a3eff8b74");
    }
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log(1);
        // 카카오 로그인 성공
        const accessToken = authObj.access_token;
        fetchUserInfo(accessToken);
      },
      fail: (err) => {
        // 카카오 로그인 실패
        console.error(err);
      },
    });
  };

  const fetchUserInfo = (accessToken) => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: (response) => {
        console.log(2);
        // 사용자 정보 가져오기 성공
        const { nickname } = response.kakao_account.profile;
        saveUserInfo(nickname);
      },
      fail: (err) => {
        // 사용자 정보 가져오기 실패
        console.error(err);
      },
    });
  };

  const saveUserInfo = (nickname) => {
    console.log(3);
    fetch("http://localhost:4000/api/saveUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User info saved:", data);
        setUserName(nickname);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Error saving user info:", error);
      });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <button onClick={handleLogin}>카카오 로그인</button>
      ) : (
        <KakaoMap userName={userName} />
      )}
    </div>
  );
};

export default App;
