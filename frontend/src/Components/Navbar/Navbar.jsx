import React, { useContext, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/dropdown_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo" onClick={() => setMenu("home")}>
        <img src={logo} alt="" />
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>AALEEYAH</p>
        </Link>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            Home
          </Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("khimar");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/khimar"
          >
            Khimar
          </Link>
          {menu === "khimar" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("");
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/about"
          >
            About
          </Link>
          {menu === "about" ? <hr /> : <></>}
        </li>
        <li>
          <a
            onClick={() => {
              setMenu("");
            }}
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://api.whatsapp.com/send/?phone=6281282503512&text&type=phone_number&app_absent=0"
            target="_blank" // to open link in a new tab
            rel="noopener noreferrer" // for security reasons
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token")?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link style={{ textDecoration: "none", color: "inherit" }} to="/login">
          <button>Login</button>
        </Link>}
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
