import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import toast from react-toastify
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit"; 
import DeleteIcon from "@mui/icons-material/Delete"; 
import SideBar from "./SideBar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { resetDelete } from "../../reducers/ProfileSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers) || {};
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile) || {};

  const deleteUserHandler = (id) => {
    console.log("Attempting to delete user with ID:", id);
    if (id) {
      console.log("Dispatching deleteUser action...");
      dispatch(deleteUser(id));
    }
  };
  
  useEffect(() => {
    console.log("Fetching users...");
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ Show error toast
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError); // ✅ Show delete error toast
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message); // ✅ Show success toast
      dispatch(getAllUsers());
      dispatch(resetDelete());
    }
  }, [dispatch, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => (params.row.role === "admin" ? "greenColor" : (params.row.role ? "redColor" : "")),
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user/${params.row.id}`}>
            <EditIcon />
          </Link>
          <Button onClick={() => deleteUserHandler(params.row.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = users && Array.isArray(users) ? users.map((item) => ({
    id: item?._id || "",
    role: item?.role || "Unknown",
    email: item?.email || "No Email",
    name: item?.name || "No Name",
  })) : [];

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
