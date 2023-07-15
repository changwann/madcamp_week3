import React, { useState } from "react";

const CommentSection = ({ comments, onNewComment }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNewComment(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="리뷰를 작성해주세요."
        />
        <button type="submit">작성</button>
      </form>
      <div>
        {[...comments].reverse().map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
