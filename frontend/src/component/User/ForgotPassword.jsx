import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline"; // ✅ Updated import
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage } from "../../reducers/forgotPasswordReducer"; // ✅ Correct Import
import { forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify"; // ✅ Import toast from react-toastify
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  // Replaced react-alert with react-toastify
  // const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error); // ✅ Replaced alert.error with toast.error
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message); // ✅ Replaced alert.success with toast.success
      dispatch(clearMessage()); // ✅ Now correctly imported
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input type="submit" value="Send" className="forgotPasswordBtn" disabled={loading} />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
