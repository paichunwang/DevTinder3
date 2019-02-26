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
      userInfo: null,
      skillSlider: null,
      roleChoice: null,
      navBar: null
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
    console.log("Value location", [values.location]);

    if (values.firstName || values.lastName) {
      this.setState(
        {
          [values.location]: values,
          navBar: { firstName: values.firstName, lastName: values.lastName }
        },
        function() {
          console.log("hitting values with first name");
        }
      );
    } else {
      this.setState({
        [values.location]: values
      });
    }
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
        const {
          _id,
          email,
          firstName,
          lastName,
          profile,
          github,
          protfolio,
          angular,
          css,
          html,
          java,
          javascript,
          nodejs,
          python,
          reactjs,
          role
        } = response.data.user[0];
        this.setState(
          {
            // redirectTo: "/user",
            userInfo: {
              _id,
              email,
              firstName,
              lastName,
              profile,
              github,
              protfolio
            },
            skillSlider: {
              _id,
              angular,
              css,
              html,
              java,
              javascript,
              nodejs,
              python,
              reactjs
            },
            roleChoice: { _id, role },
            navBar: { firstName, lastName, role }
          },
          function() {
            console.log(this.state.userInfo, this.state.skillSlider);
            console.log(this.state.roleChoice, this.state.navBar);
          }
        );
      } else {
        console.log("No user found. redircting user back to /login");
      }
    });
  }

  render() {
    console.log(this.props);
    console.log("this.state in user index", this.state);
    const {
      currentLocation,
      userInfo,
      skillSlider,
      roleChoice,
      navBar
    } = this.state;
    // const { userInfo } = this.state.userInfo;

    return (
      <div>
        {userInfo !== null && (
          <>
            <Sidenav
              action={this.handler}
              currentLocation={currentLocation}
              display={navBar}
            />
            <div style={userContent}>
              {currentLocation === "/user" && (
                <Profile
                  userInfo={userInfo}
                  skillSlider={skillSlider}
                  roleChoice={roleChoice}
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
        {userInfo === null && (
          <div>
            hitting null, need some thing here for loading page incase query
            took too long
          </div>
        )}
      </div>
    );
  }
}

export default User;
