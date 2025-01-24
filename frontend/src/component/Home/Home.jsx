import React, { Fragment, useEffect  } from 'react'
import { CgMouse } from "react-icons/cg";
import Product from './Product';
import "./Home.css"
import MetaData from '../layout/MetaData';
import {getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert"



const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch,error]);



  return (
    <Fragment>
      {loading ? (<Loader />):(
        <Fragment>
        <MetaData title="1-STOP"/>
          <div className="banner">
              <p><span>Welcome to 1-STOP.</span></p>
              <h1> <strong><span>FIND ALL THE MERCH's </span>BELOW</strong></h1>
  
              <a href="#container">
                  <button>
                      Scroll <CgMouse />
                  </button>
              </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
          {products &&
                products.map((product) => (
                  <Product  product = {product} />
                ))}
          </div>
      </Fragment>
      )}
      </Fragment>
  )
}

export default Home