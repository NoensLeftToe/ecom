import React, {Fragment, useEffect } from "react";
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom"; // Import useParams

const ProductDetails = () => {
  const { id } = useParams(); // Use useParams to get the 'id' from the URL
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id)); // Use id from useParams
  }, [dispatch, id]);

  return (
    <Fragment>
    <div className="ProductDetails">
      <div>
        <Carousel>
          {product.images &&
            product.images.map((item, i) => (
              <img
                className="CarouselImage"
                key={i}
                src={item.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>
      </div>

      <div className="detailsBlock-1">
      <h2>{product.name}</h2>
      <p>Product # {product._id}</p>
      </div>
    </div>
    </Fragment>
  );
};

export default ProductDetails;
