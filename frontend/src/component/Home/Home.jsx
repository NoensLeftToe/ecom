import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { getProduct, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify"; // ✅ Import toast from react-toastify
import ProductCard from "./ProductCard";

const Home = () => {
  const dispatch = useDispatch();

  // Accessing the productList state
  const { loading, error, products } = useSelector((state) => state.productList);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Display 10 products per page

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ Use toast.error
      dispatch(clearErrors());
    }

    // Fetch products whenever the current page changes
    dispatch(getProduct({ currentPage }));
  }, [dispatch, error, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

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
            {products && products.length > 0 ? (
              products.slice(0, itemsPerPage).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 1}
              className="pagination-btn prev"
            >
              ◀ Prev
            </button>
            
            <span className="page-number">{currentPage}</span>

            <button 
              onClick={handleNextPage} 
              className="pagination-btn next"
            >
              Next ▶
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
