import React from 'react'
import { Link } from 'react-router-dom'
import AwesomeStarsRating from "react-awesome-stars-rating"

const Product = ({ product }) => {
  const options = {
    edit: false,
  }

  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <AwesomeStarsRating {...options} />
        <span> (256 reviews)</span>
      </div>
      <span>{`${product.price}`}</span>
    </Link>
  )
}

export default Product
