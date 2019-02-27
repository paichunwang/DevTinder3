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
      currentLocation: "/user/add",
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
    //console.log("Hitting Parent handler ", location);
    this.setState({
      currentLocation: location
    });
    //console.log("POST STATE ", this.state.currentLocation);
  }

  handleChildUpdate = values => {
    //console.log("hitting handleChildUpdate user index with ", values);
    //console.log("Value location", [values.location]);

    //need to catch when user name gets replace by "" empty content
    if (values.firstName || values.lastName) {
      this.setState(
        {
          [values.location]: values,
          navBar: {
            ...this.state.navBar,
            firstName: values.firstName,
            lastName: values.lastName
          }
        },
        function() {
          // console.log(
          //   "hitting values with first or last name",
          //   this.state.navBar
          // );
        }
      );
    } else if (values.role) {
      this.setState(
        {
          [values.location]: values,
          navBar: {
            ...this.state.navBar,
            role: values.role
          }
        },
        function() {
          //console.log(
          //   "hitting role change and updating navbar display state",
          //   this.state.navBar
          // );
        }
      );
    } else {
      this.setState(
        {
          [values.location]: values
        },
        function() {
          //console.log("Hitting generic value / state change", values);
        }
      );
    }
  };

  componentDidMount() {
    this.getCookie();
    this.callProject();
  }

  //this call is not passported
  getCookie() {
    axios.get("/user/").then(response => {
      //console.log("Get user response: ");
      //console.log(response.data.user);
      //here need to pass id back from passport call
      if (response.data.user) {
        const {
          _id,
          email,
          firstName,
          lastName,
          profile,
          github,
          portfolio,
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
              portfolio
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
            //console.log(this.state.userInfo, this.state.skillSlider);
            //console.log(this.state.roleChoice, this.state.navBar);
          }
        );
      } else {
        //console.log("No user found. redircting user back to /login");
      }
    });
  }

  addProject() {
    console.log("Hitting user index addProject");
  }

  callProject() {
    console.log("Hitting user index callProject");
  }

  render() {
    //console.log(this.props);
    //console.log("this.state in user index", this.state);
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
              {currentLocation === "/user/add" && (
                <Project addProject={this.addProject} />
              )}
              {currentLocation === "/user/invite" && (
                <Project inviteProject={this.callProject} />
              )}
              {currentLocation === "/user/project" && (
                <Project callProject={this.callProject} />
              )}
              {currentLocation === "/user/complete" && (
                <Project callProject={this.callProject} />
              )}
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
