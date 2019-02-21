import React from "react";

//this page is the main render for user page, base on switch case, Sidnav + Profile / Project will be provided

import Sidenav from "./profile/profile_navigation/side_nav_profile";
import Profile from "./profile/index";
import Project from "./profile/project/project_page";

const userContent = { width: "50%" };

class User extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.state = {
      currentLocation: "/user"
    };
  }

  handler(location) {
    console.log("Hitting Parent handler ", location);
    this.setState({
      currentLocation: location
    });
    console.log("POST STATE ", this.state.currentLocation);
  }

  render() {
    console.log(this.state.currentLocation);

    const { currentLocation } = this.state;

    return (
      <div>
        <Sidenav action={this.handler} currentLocation={currentLocation} />
        <div style={userContent}>
          {currentLocation === "/user" && <Profile />}
          {currentLocation === "/user/add" && <Project />}
          {currentLocation === "/user/invite" && "INVITE"}
          {currentLocation === "/user/project" && "PROJECT"}
          {currentLocation === "/user/complete" && "COMPLETE"}
          {currentLocation === "/user/signout" && "SIGNOUT"}
        </div>
      </div>
    );
  }
}

export default User;
