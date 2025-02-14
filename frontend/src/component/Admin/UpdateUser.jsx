import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./SideBar";
import Loader from "../layout/Loader/Loader";
import { getUserDetails, updateUser, clearErrors } from "../../actions/userAction";
import { resetUpdate } from "../../reducers/ProfileSlice";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  if (!userId || userId.trim() === "") {
    alert.error("Invalid user ID");
    return null;
  }

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userId) {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name || "");
        setEmail(user.email || "");
        setRole(user.role || "");
      }
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch(resetUpdate());
    }
  }, [dispatch, alert, error, isUpdated, updateError, user, userId, navigate]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
  
    if (!userId) {
      alert.error("User ID is missing or invalid");
      return;
    }
  
    const updatedUserData = { name, email, role };  // ✅ Correct variable
    dispatch(updateUser({ id: userId, userData: updatedUserData }));  // ✅ Use the correct variable
  };
  

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form className="createProductForm" onSubmit={updateUserSubmitHandler}>
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <MailOutlineIcon />
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button id="createProductBtn" type="submit" disabled={updateLoading || role === ""}>
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
