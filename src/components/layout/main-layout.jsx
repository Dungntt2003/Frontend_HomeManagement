import Header from "../header";
import Footer from "../footer/footer";
import React from "react";
function MainLayout(props) {
  return (
    <div>
      <Header />
      <div>
        <props.component />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
