import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import './App.css';
import WebFont from 'webfontloader';
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products"
import Search from "./component/Product/Search"
import LoginSignUp from "./component/User/LoginSignUp"
import store from "./store"
import {loadUser} from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile"
import ProtectedRoute from "./component/Route/ProtectedRoute"
import UpdateProfile from "./component/User/UpdateProfile"
import UpdatePassword from "./component/User/UpdatePassword"
import ForgotPassword from "./component/User/ForgotPassword"
import ResetPassword from "./component/User/ResetPassword"
import Cart from "./component/Cart/Cart"
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios"
import Payment from "./component/Cart/Payment"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList"
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews"
import NotFound from "./component/layout/NotFound/NotFound"


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      
      {/* Stripe Elements Wrapper Outside Routes */}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment/process" element={<Payment />} />
              <Route path="/success" element={<OrderSuccess/>} />
              <Route path="/orders" element={<MyOrders/>} />

             
             <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/order/:id" element={<OrderDetails/>} />
              <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard/>} />
              <Route isAdmin={true} path="/admin/products" element={<ProductList/>} />
              <Route isAdmin={true} path="/admin/product" element={<NewProduct/>} />
             
              <Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>} />
              <Route isAdmin={true} path="/admin/orders" element={<OrderList/>} />
              <Route isAdmin={true} path="/admin/order/:id" element={<ProcessOrder/>} />
              <Route isAdmin={true} path="/admin/users" element={<UsersList/>} />
              <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>} />
              <Route isAdmin={true} path="/admin/reviews" element={<ProductReviews/>} />
             
            </Route>

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="*" element={window.location.pathname === "/process/payment" ? null : <NotFound />} />
          </Routes>
      </Elements>
      )}
      
      <Footer />
    </Router>
  );
}

export default App;