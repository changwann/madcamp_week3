import React, { useState, useEffect } from "react";

// 각 탭의 내용을 담을 컴포넌트
const HomeTab = () => <div>홈 정보</div>;
const MenuTab = () => <div>메뉴 정보</div>;
const ReviewTab = ({ place, comments, addComment, CommentSection }) => (
  <div>
    리뷰 정보
    {place && (
      <CommentSection
        comments={comments[place] || []}
        onNewComment={(comment) => addComment(place, comment)}
      />
    )}
  </div>
);

const Tabs = ({ place, comments, addComment, CommentSection }) => {
  const [currentTab, setCurrentTab] = useState("home");

  useEffect(() => {
    setCurrentTab("home");
  }, [place]);

  const buttonStyle = { width: "33.33%", height: "50px" };
  const activeButtonStyle = { ...buttonStyle, backgroundColor: "darkgray" };

  return (
    <div>
      <button
        style={currentTab === "home" ? activeButtonStyle : buttonStyle}
        onClick={() => setCurrentTab("home")}
      >
        홈
      </button>
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

      {currentTab === "home" && <HomeTab />}
      {currentTab === "menu" && <MenuTab />}
      {currentTab === "review" && (
        <ReviewTab
          place={place}
          comments={comments}
          addComment={addComment}
          CommentSection={CommentSection}
        />
      )}
    </div>
  );
};

export default Tabs;
