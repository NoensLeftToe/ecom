import React, { Fragment, useRef, useState, useEffect } from 'react';
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import{ useDispatch, useSelector} from "react-redux";
import { clearErrors, updateProfile, loadUser} from '../../actions/userAction';
import{useAlert} from "react-alert";
import { useNavigate } from "react-router-dom";
import { resetUpdate } from "../../reducers/ProfileSlice"
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate(); // Replaces history.push()
  
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
    const updateProfileSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
  
      dispatch(updateProfile(myForm));
    };
  
    const updateProfileDataChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar?.url || "/Profile.png");
      }
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser()); // Reload user data
        navigate("/account"); // Redirect to profile page
        dispatch( resetUpdate()); // Reset update state using Redux Toolkit action
      }
    }, [dispatch, error, alert, navigate, user, isUpdated]);
  
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
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
  
                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                    disabled={loading}
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  export default UpdateProfile;