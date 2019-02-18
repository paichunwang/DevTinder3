import React from "react";
import SideNav from "./profile/side_nav_profile";
// import Two from "../user/project_postAuth/index";
// THIS IS THE COMBINED OF SIDENAV AND PROFILE/SLIDER/PROJECT
const Sidenav = () => (
  <div style={{ width: "800px", margin: "30px 0px 0px" }}>
    <SideNav />
    {/* <Two /> */}
  </div>
);

export default Sidenav;
