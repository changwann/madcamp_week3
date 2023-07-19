
import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./ReviewTab.css";

const ReviewTab = ({ userName, place }) => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [isWritingReview, setIsWritingReview] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/getReviews/${place.name}`)
      .then((res) => {
        const reviewsFromServer = res.data.reviews;
        setReviews(Array.isArray(reviewsFromServer) ? reviewsFromServer : []);
        setAverageRating(res.data.averageRating || 0);
      })
      .catch((err) => console.error(err));
  }, [place]);

  const onTextChange = (e) => {
    setReview(e.target.value);
  };

  const onRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onReviewSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/saveReview", {
        nickname: userName,
        review,
        place: place.name,
        rating,
      })
      .then(() => {
        setReview("");
        setRating(0);
        setIsWritingReview(false);

        axios
          .get(`/api/getReviews/${place.name}`)
          .then((res) => {
            setReviews(res.data.reviews);
            setAverageRating(res.data.averageRating);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const onCancelReview = () => {
    setReview("");
    setRating(0);
    setIsWritingReview(false);
  };

  return (
    <div className="review-tab-container">
      <button onClick={() => setIsWritingReview(true)}>리뷰 작성</button>
      {isWritingReview ? (
        <form onSubmit={onReviewSubmit} className="review-form">
          <textarea
            value={review}
            onChange={onTextChange}
            placeholder="리뷰를 작성하세요"
          />
          <StarRatings
            rating={rating}
            starRatedColor="#FEBD1A"
            changeRating={onRatingChange}
            numberOfStars={5}
            name="rating"
          />
          <div className="button-container">
            <button type="button" onClick={onCancelReview}>취소</button>
            <button type="submit">작성</button>
          </div>
        </form>
      ) : null}
      <div className="average-rating-container">
        <StarRatings
          rating={averageRating}
          starDimension="40px"
          starSpacing="15px"
          starRatedColor="#FEBD1A"
        />
        <span>{averageRating.toFixed(2)}</span>
      </div>
      <div className="reviews-container">
        {reviews &&
          reviews.map((review, idx) => (
            <div className="review-item" key={idx}>
              <StarRatings
                rating={review.rating}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor="#FEBD1A"
              />
              <h4>{review.nickname}</h4>
              <p>{review.review}</p>
              <small>{new Date(review.timestamp).toLocaleDateString()}</small>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewTab;
