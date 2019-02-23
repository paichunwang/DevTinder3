import React from "react";

//this page is the main render for user page, base on switch case, Sidnav + Profile / Project will be provided

import Sidenav from "./profile/profile_navigation/side_nav_profile";
import Profile from "./profile/index";
import Project from "./profile/project/project_page";

const userContent = { width: "50%" };

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: "/user",
      userInfo: this.props.location.state[0]
    };
    this.handler = this.handler.bind(this);
  }

  handler(location) {
    console.log("Hitting Parent handler ", location);
    this.setState({
      currentLocation: location
    });
    console.log("POST STATE ", this.state.currentLocation);
  }

  render() {
    // console.log(this.state.currentLocation);
    // console.log("this.props", this.props.location.state[0]);
    const { currentLocation } = this.state;
    // const { userInfo } = this.state.userInfo;

    return (
      <div>
        <Sidenav action={this.handler} currentLocation={currentLocation} />
        <div style={userContent}>
          {currentLocation === "/user" && <Profile {...this.state} />}
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
