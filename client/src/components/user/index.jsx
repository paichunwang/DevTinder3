import React from "react";

//this page is the main render for user page, base on switch case, Sidnav + Profile / Project will be provided

import Sidenav from "./profile/profile_navigation/side_nav_profile";
import Profile from "./profile/index";
import Project from "./profile/project/project_page";

class User extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div>
        <Project />
      </div>
    );
  }
}

export default User;
