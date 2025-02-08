import React from 'react';
import { Rating } from "@mui/material"; 
import bento from "../../Images/bento.jpg";

const ReviewCard = ({ review }) => { // ✅ Accept `review` as a prop
  const options = {
    size: "small",
    value: review?.rating || 0, // ✅ Avoid undefined errors
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className='reviewCard'>
      <img src={bento} alt="User" />
      <p>{review?.name || "Anonymous"}</p> {/* ✅ Prevent undefined errors */}
      <Rating {...options} />
      <span>{review?.comment || "No comment provided"}</span>
    </div>
  );
};

export default ReviewCard;
