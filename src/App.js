import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  CircularProgress,
} from "@material-ui/core/";

//import styles
import "./Styles/app.scss";
//import components
import Login from "./Components/Login/Login.js";
import NursePage from "./Components/Nurse/NursePage.js";
import ProtectedRoute from "./Components/Routes/ProtectedRoute.js";
import ProtectedLogin from "./Components/Routes/ProtectedLogin.js";
import Physician from "./Components/Physician/PhysicianDashboard.js";
import Admin from "./Components/Admin/Admin.js";
// import "./Components/firebase/firebase.js";

function App() {
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("");
  const [authenticate, setAuthenticate] = useState(false);
  const [userToken, setUserToken] = useState("");
  //"proxy": "https://159.203.29.156:443",

  useEffect(() => {
    fetch("https://server.wmaneesh.com/isAuthenticated", {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad");
        }
      })
      .then((result) => {
        if (result !== "") {
          setAccountType(`/medmemo${result.path}`);
          setAuthenticate(true);
          setUserToken(result.user);
        } else {
          setAuthenticate(false);
          setAccountType("/medmemo/");
          setUserToken("");
        }
      });
  }, [accountType, authenticate, userToken]);

  const themes = createMuiTheme({
    palette: {
      primary: {
        light: "#5bc8c2",
        main: "#33bbb3",
        dark: "#23827d",
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        {accountType !== "" ? (
          <Switch>
            <ProtectedRoute
              path="/medmemo/nurse"
              component={NursePage}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
              userToken={userToken}
            />
            <ProtectedRoute
              path="/medmemo/physician"
              component={Physician}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
              userToken={userToken}
            />
            <ProtectedRoute
              path="/medmemo/admin"
              component={Admin}
              search={search}
              setSearch={setSearch}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
            />
            <ProtectedLogin
              path="/medmemo"
              component={Login}
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
              accountType={accountType}
              setAccountType={setAccountType}
              setUserToken={setUserToken}
            />
          </Switch>
        ) : (
          <div className={classes.root}>
            <MuiThemeProvider theme={themes}>
              <CircularProgress
                style={{ position: "fixed", top: "30%", left: "50%" }}
                size={200}
              />
            </MuiThemeProvider>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
