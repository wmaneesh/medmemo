import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearchInput = (event) => {
    props.setSearch(event.target.value);
  };

  const handleReset = (event) => {
    props.setSearch("");
  };

  const handleLogout = () => {
    console.log("logout is being called");
    fetch("https://server.wmaneesh.com/login/logout", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        history.push("/medmemo/");
        return res.json();
      } else {
        console.log("logout was unsuccessfull");
      }
    });
    props.setAuthenticate(false);
    Cookies.remove("sid");
  };

  return (
    <header className="main-navbar">
      <div className="navbar-contents">
        <Link to="/medmemo/">
          <FontAwesomeIcon className="logo fa-2x" icon={faClinicMedical} />
        </Link>
        <a className="search-icon">
          <input
            type="search"
            placeholder="search patient"
            value={props.search}
            onChange={handleSearchInput}
          />
          <FontAwesomeIcon
            className="close"
            icon={faTimes}
            onClick={handleReset}
          />
          <FontAwesomeIcon className="search" icon={faSearch} />
        </a>

        <div
          onClick={handleClick}
          className={open ? "hamburger-module active" : "hamburger-module"}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className="navbar">
          <ul className={open ? "navbar-menu active" : "navbar-menu"}>
            <li className="navBar-li">
              <a href="#" className="navbar-links">
                Select Wing
              </a>
            </li>
            <li className="navBar-li">
              <a href="#" className="navbar-links">
                Help
              </a>
            </li>
            <li className="navBar-li">
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
