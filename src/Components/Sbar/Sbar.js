import React from "react";
import { useParams } from "react-router-dom";

import Header from "../Nurse/Header";
import Sbarfrom from "./Sbarform.js";

export default function Sbar(props) {
  const param = useParams();

  return (
    <div>
      <Header title={`Patient: ${param.patientName}`} />
      <div className="paper-container">
        <Sbarfrom
          nurseId={props.nurseId}
          nurseName={props.nurseName}
          patientName={param.patientName}
          patientId={param.patientId}
          roomId={param.roomId}
        />
      </div>
    </div>
  );
}
