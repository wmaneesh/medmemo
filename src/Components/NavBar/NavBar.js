import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClinicMedical,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase/firebase";
import NurseMsgList from "../Nurse/notify/NurseMsgList";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);
  const [nurseInbox, setNurseInbox] = useState([]);

  const history = useHistory();

  let temp = [];
  let item = [];
  const db = firebase.firestore();

  useEffect(() => {
    if (props.nurseId !== undefined && props.nurseId !== "") {
      const ref = db.collection("msg");
      const q = ref
        .where("nurse_id", "==", props.nurseId)
        .onSnapshot((querySnapshot) => {
          temp = [];
          querySnapshot.forEach((doc) => {
            item = doc.data();
            item.key = doc.id;
            temp.push(item);
          });
          setNurseInbox(temp);
        });
    }
  }, [props.nurseId]);

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
    fetch("https://server.wmaneesh.com/login/logout", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("logout was unsuccessfull");
        }
      })
      .then((result) => {
        props.setAuthenticate(false);
        history.push("/medmemo");
      });
  };

  return (
    <header className="main-navbar">
      <div className="navbar-contents">
        <a href="/medmemo">
          <FontAwesomeIcon className="logo fa-2x" icon={faClinicMedical} />
        </a>
        <a className="search-icon">
          <input
            type="search"
            placeholder="Search patient"
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <NurseMsgList inbox={nurseInbox} />
              </div>
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
