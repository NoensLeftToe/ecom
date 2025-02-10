import React, { useState } from "react";
import "./SideBar.css";
import logo from "../../Images/bento.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openProducts, setOpenProducts] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      {/* Products Section - Collapsible List */}
      <List component="nav">
        <ListItemButton onClick={() => setOpenProducts(!openProducts)}>
          <ListItemIcon>
            <ImportExportIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {openProducts ? <ExpandMoreIcon /> : <ExpandMoreIcon style={{ transform: "rotate(180deg)" }} />}
        </ListItemButton>

        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => navigate("/admin/products")}>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="All Products" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/admin/product")}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
