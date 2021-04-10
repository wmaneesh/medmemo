import React from "react";

import Header from "../../Nurse/Header";
import ViewSbarForm from "./ViewSbarForm.js";

export default function ViewSbar(props) {
  return (
    <div>
      <Header title={`Patient: ${props.patientName}`} />
      <Header title={`Created on: ${props.dateCreated}`} />
      <div className="paper-container-1">
        <ViewSbarForm
          patientId={props.patientId}
          nurseName={props.nurseName}
          dateCreated={props.dateCreated}
        />
      </div>
    </div>
  );
}
