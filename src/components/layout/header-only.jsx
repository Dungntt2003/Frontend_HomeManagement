import Header from "../header";
import React from "react";
function HeaderOnly(props) {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "70px" }}>
        <props.component />
      </div>
    </div>
  );
}

export default HeaderOnly;
