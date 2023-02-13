import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useAuth } from '../../store/AuthContext';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate()
  const { logout } = useAuth();

  const clickedlogout = async () => {
    try {
      await logout();
      navigate("/admin/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">STUDENTS</p>
          <Link to="/admin/students/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Student register</span>
            </li>
          </Link>
          <Link to="/admin/students" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Student Management</span>
            </li>
          </Link>
          <Link to="/admin/students/covid-status" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Covid Status</span>
            </li>
          </Link>
          <Link to="/admin/students/vaccinated" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Vaccination</span>
            </li>
          </Link>

          <p className="title">TEACHERS</p>
          <Link to="/admin/teachers/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Teacher register</span>
            </li>
          </Link>
          <Link to="/admin/teachers" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Teacher Management</span>
            </li>
          </Link>
          <Link to="/admin/teachers/covid-status" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Covid Status</span>
            </li>
          </Link>
          <Link to="/admin/teachers/vaccinated" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Vaccination</span>
            </li>
          </Link>

          <p className="title">ADMIN</p>
          <Link to="/admin/messages" style={{ textDecoration: "none" }}>
            <li>
              <ChatBubbleOutlineOutlinedIcon className="icon" />
              <span>Messages</span>
            </li>
          </Link>
          <Link to="/admin/students/add-notification" style={{ textDecoration: "none" }}>
            <li>
              <ChatBubbleOutlineOutlinedIcon className="icon" />
              <span>Add Exam Notification</span>
            </li>
          </Link>
          <Link to="/admin/students/exams" style={{ textDecoration: "none" }}>
            <li>
              <ChatBubbleOutlineOutlinedIcon className="icon" />
              <span>Exams </span>
            </li>
          </Link>

          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={clickedlogout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
