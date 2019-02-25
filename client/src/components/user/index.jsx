import React from "react";

//this page is the main render for user page, base on switch case, Sidnav + Profile / Project will be provided

import Sidenav from "./profile/profile_navigation/side_nav_profile";
import Profile from "./profile/index";
import Project from "./profile/project/project_page";

import axios from "axios";

const userContent = { width: "50%" };

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: "/user",
      // set to null since only want what the passport deserializer calls on THIS page.
      userInfo: null
    };
    this.handler = this.handler.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handler(location) {
    console.log("Hitting Parent handler ", location);
    this.setState({
      currentLocation: location
    });
    console.log("POST STATE ", this.state.currentLocation);
  }

  handleChildUpdate = values => {
    console.log("hitting handleChildUpdate user index with ", values);
    this.setState({
      userInfo: values
    });
  };

  componentDidMount() {
    this.getCookie();
  }

  //this call is not passported
  getCookie() {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data.user);
      //here need to pass id back from passport call
      if (response.data.user) {
        this.setState({
          // redirectTo: "/user",
          userInfo: response.data.user[0]
        });
      } else {
        console.log("No user found.");
      }
    });
  }

  render() {
    console.log(this.props);
    console.log("this.state in user index", this.state);
    const { currentLocation, userInfo } = this.state;
    // const { userInfo } = this.state.userInfo;

    return (
      <div>
        {userInfo !== null && (
          <>
            <Sidenav action={this.handler} currentLocation={currentLocation} />
            <div style={userContent}>
              {currentLocation === "/user" && (
                <Profile
                  userInfo={userInfo}
                  onChildUpdate={this.handleChildUpdate}
                />
              )}
              {currentLocation === "/user/add" && <Project />}
              {currentLocation === "/user/invite" && "INVITE"}
              {currentLocation === "/user/project" && "PROJECT"}
              {currentLocation === "/user/complete" && "COMPLETE"}
              {currentLocation === "/user/signout" && "SIGNOUT"}
            </div>
          </>
        )}
        {userInfo === null && <div>hitting null</div>}
      </div>
    );
  }
}

export default User;
