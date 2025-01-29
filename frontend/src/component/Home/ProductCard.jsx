import React from 'react'
import { Link } from 'react-router-dom'
import AwesomeStarsRating from "react-awesome-stars-rating"

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    value: product.ratings
  }

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <AwesomeStarsRating {...options} />
        <span>({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`${product.price}`}</span>
    </Link>
  )
}

export default ProductCard;