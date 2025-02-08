import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  // ✅ Ensure orders is always an array
  const { loading, error, orders = [] } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);

  console.log("Redux Orders:", orders); // ✅ Debugging step

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  // ✅ Ensure rows are created only when `orders` exist
  const rows = orders.length > 0 ? orders.map((order) => ({
    id: order?._id || "N/A",
    itemsQty: order?.orderItems?.length || 0,
    status: order?.orderStatus || "N/A",
    amount: order?.totalPrice || 0,
  })) : [];

  return (
    <Fragment>
      <MetaData title={`${user?.name || "User"} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">
            {user?.name || "User"}'s Orders
          </Typography>
          {rows.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
              disableSelectionOnClick
              className="myOrdersTable"
            />
          ) : (
            <Typography className="noOrdersMessage">No orders found.</Typography>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
