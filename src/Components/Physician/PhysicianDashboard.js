import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PhysicianPatientList from "./PhysicianPatientList";
import PhysicianNavBar from "./notification/PhysicianNavbar";
import Header from "../Nurse/Header";

const PhysicianDashBoard = (props) => {
  const [physicianId, setPhysicianId] = useState("");
  const [physician_name, setPhysicianName] = useState("");

  useEffect(() => {
    fetch(`https://server.wmaneesh.com/physician/getId/${props.userToken}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("network response was bad, phys id");
        }
      })
      .then((result) => {
        if (result !== undefined && result.length !== 0) {
          setPhysicianId(result[0].physician_id);
          setPhysicianName(`Dr. ${result[0].physician_name}`);
          //getRemarks(result[0].physician_id);
        }
      });
  }, [props.userToken]);

  return (
    <div>
      <PhysicianNavBar
        search={props.search}
        setSearch={props.setSearch}
        setAuthenticate={props.setAuthenticate}
        // messageList={inbox}
        physicianID={physicianId}
      />
      <Switch>
        <Route exact path="/medmemo/physician">
          <Header title={physician_name} />
          <PhysicianPatientList search={props.search} />
        </Route>
      </Switch>
    </div>
  );
};

export default PhysicianDashBoard;
