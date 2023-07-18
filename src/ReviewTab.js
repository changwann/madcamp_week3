import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewTab = ({ userName, place }) => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Get reviews when place changes
    axios
      .get(`/api/getReviews/${place.name}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [place]);

  const onTextChange = (e) => {
    setReview(e.target.value);
  };

  const onReviewSubmit = (e) => {
    e.preventDefault();

    // Save review
    axios
      .post("/api/saveReview", { nickname: userName, review, place: place.name })
      .then(() => {
        // Update reviews
        setReviews((oldReviews) => [{ nickname: userName, review, timestamp: new Date() }, ...oldReviews]);
        setReview("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form onSubmit={onReviewSubmit}>
        <input name="review" onChange={onTextChange} value={review} placeholder="Write a review" />
        <button>Submit</button>
      </form>
      {reviews.map((review, idx) => (
        <div key={idx}>
          <h4>{review.nickname}</h4>
          <p>{review.review}</p>
          <small>{new Date(review.timestamp).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewTab;