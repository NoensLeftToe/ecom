import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction"; 
import { toast } from "react-toastify"; // ✅ Import toast from react-toastify
import { useParams, useNavigate } from "react-router-dom"; // ✅ Import useParams for token extraction
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen"; 
import LockIcon from "@mui/icons-material/Lock"; 
import { resetUpdate } from "../../reducers/ProfileSlice"; 

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Replacing history with useNavigate
  const { token } = useParams(); // ✅ Extract token from URL

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    
    dispatch(resetPassword({ token, passwords: myForm })); // ✅ Send token correctly
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ Replaced alert.error with toast.error
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully"); // ✅ Replaced alert.success with toast.success
      dispatch(resetUpdate()); // ✅ Reset Redux state
      navigate("/login"); // ✅ Navigate after success
    }
  }, [dispatch, error, success, navigate]); // ✅ Remove alert and replace with navigate

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Update" className="resetPasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
