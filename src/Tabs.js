import React, { useState, useEffect } from "react";
import HomeTab from "./HomeTab";
import MenuTab from "./MenuTab";
import ReviewTab from "./ReviewTab";

const Tabs = ({ place, userName }) => {
  const [currentTab, setCurrentTab] = useState("home");

  useEffect(() => {
    setCurrentTab("home");
  }, [place]);

  const buttonStyle = { width: "33.33%", height: "50px" };
  const activeButtonStyle = { ...buttonStyle, backgroundColor: "darkgray" };

  return (
    <div>
      {place && (
        <div>
          <button
            style={currentTab === "menu" ? activeButtonStyle : buttonStyle}
            onClick={() => setCurrentTab("menu")}
          >
            메뉴
          </button>
          <button
            style={currentTab === "review" ? activeButtonStyle : buttonStyle}
            onClick={() => setCurrentTab("review")}
          >
            리뷰


          </button>

          <button
            style={currentTab === "home" ? activeButtonStyle : buttonStyle}
            onClick={() => setCurrentTab("home")}
          >
            채팅
          </button>

          {currentTab === "home" && (
            <HomeTab userName={userName} place={place} />
          )}
          {currentTab === "menu" && <MenuTab place={place} />}
          {currentTab === "review" && (
            <ReviewTab userName={userName} place={place} />
          )}
        </div>
      )}
    </div>
  );
};

export default Tabs;
