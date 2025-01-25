import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  // Accessing the productList state
  const { loading, error, products } = useSelector((state) => state.productList);

  useEffect(() => {
    if (error) {
      alert.error(error);  // Show the error message
      dispatch(clearErrors());  // Clear the error after showing it
    }

    // Only dispatch getProduct if products are not already loaded and there's no ongoing loading
    if (!loading && !products.length) {
      dispatch(getProduct());
    }
  }, [dispatch, error, alert, loading, products]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="1-STOP" />
          <div className="banner">
            <p>
              <span>Welcome to 1-STOP.</span>
            </p>
            <h1>
              <strong>
                <span>FIND ALL THE MERCH's </span>BELOW
              </strong>
            </h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {/* Fallback if no products are found */}
            {products && products.length > 0 ? (
              products.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
