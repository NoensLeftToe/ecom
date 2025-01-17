import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg";
import Product from './Product';
import "./Home.css"
import MetaData from '../layout/MetaData';

const product = {
  name: "hotarubi mask",
  images: [{url:"https://i.pinimg.com/736x/ba/a9/63/baa963bfdbda885cf24392b5e347603f.jpg"}],
  price:"3000$",
  _id:"abhishek",
}

const Home = () => {
  return (
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
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        </div>
    </Fragment>
  )
}

export default Home