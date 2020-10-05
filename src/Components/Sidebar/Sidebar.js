import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logos/logo.png";
import peopleIcon from "../../images/logos/users-alt 1.png";
import plusIcon from "../../images/logos/plus 1.png";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/admin-dashboard">
              <img src={peopleIcon} alt="icon" className="sidebar-icon" />{" "}
              Volunteer register list
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/add-event">
              <img src={plusIcon} alt="iconPlus" className="sidebar-icon" /> Add
              event
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
