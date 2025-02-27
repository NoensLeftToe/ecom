import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom"; // ✅ Updated for v6
import { Typography } from "@mui/material"; // ✅ Updated for MUI v5
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify"; // ✅ Import toast from react-toastify

const OrderDetails = () => {
  const { id } = useParams(); // ✅ React Router v6
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ Replace alert.error with toast.error
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">Order #{order?._id}</Typography>

              <Typography variant="h6">Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order?.user?.name || "N/A"}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order?.shippingInfo?.phoneNo || "N/A"}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order?.shippingInfo
                      ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                      : "N/A"}
                  </span>
                </div>
              </div>

              <Typography variant="h6">Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.paymentInfo?.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order?.paymentInfo?.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>₹{order?.totalPrice || 0}</span>
                </div>
              </div>

              <Typography variant="h6">Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order?.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order?.orderStatus || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography variant="h6">Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order?.orderItems?.length > 0 ? (
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt={item.name} />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No items in this order.</p>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
