import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
import kaist from "./assets/kaist.jpg";
import icon from "./assets/icon.png";
import "./App.css";

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
    fetch("http://172.10.5.143:443/api/saveUserInfo", {
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
    <div className="background">
      <div className="centerBox">
        {!isLoggedIn ? (
          <div className="content">
            <img src={icon} alt="icon" className="icon" />
            <h2>카이스트에 오신 걸 환영합니다!</h2>
            <h2
              style={{
                margin: "0",
              }}
            >
              KAIST MAP 서비스를 이용하려면 로그인을 해주세요.
            </h2>
            <button className="loginButton" onClick={handleLogin}>
              카카오 로그인
            </button>
          </div>
        ) : (
          <KakaoMap userName={userName} />
        )}
      </div>
    </div>
  );
};

export default App;
