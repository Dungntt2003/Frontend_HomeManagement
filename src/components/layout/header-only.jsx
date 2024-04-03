import Header from "../header";
import React from "react";
function HeaderOnly(props) {
  return (
    <div>
      <Header />
      <div>
        <props.component />
      </div>
    </div>
  );
}

export default HeaderOnly;
