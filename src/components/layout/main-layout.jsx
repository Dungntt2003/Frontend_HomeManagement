import Header from "../header";
import Footer from "../footer/footer";
import React from "react";
function MainLayout(props) {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "59px" }}>
        <props.component />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
