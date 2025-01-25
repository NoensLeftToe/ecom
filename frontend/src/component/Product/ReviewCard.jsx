import React from 'react'
import AwesomeStarsRating from "react-awesome-stars-rating"
import bento from "../../Images/bento.jpg"
const ReviewCard = () => {

    const options = {
        size: "small",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };

  return (
    <div className='reviewCard'>
         <img src={bento} alt="User" />
         <p>{review.name}</p>
         <AwesomeStarsRating {...options} />
         <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard