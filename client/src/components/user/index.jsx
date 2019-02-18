import React from "react";
import One from "../user/profile_system/index";
import Two from "../user/profile_navigation/index";
// THIS IS THE COMBINED OF SIDENAV AND PROFILE/SLIDER/PROJECT
const Profile = () => (
  <div style={{ width: "800px", paddingTop: "10vh" }}>
    <One />
    <Two />
  </div>
);

export default Profile;
