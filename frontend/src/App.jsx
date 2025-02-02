import { useEffect } from 'react';
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


function App() {

  const {isAuthenticated, user} = useSelector(state=>state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser())
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user = {user}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:keyword" element={<Products/>} />
        <Route path="/search" element={<Search />} />
        
        <Route element={<ProtectedRoute />}>
        <Route path="/account" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
        <Route path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
        <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        
        <Route path="/password/forgot" element={<ForgotPassword />} />
        
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        <Route path="/cart" element={<Cart />} />


        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
