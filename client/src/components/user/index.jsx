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
      navBar: null,
      project: null
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
    console.log(this.state);
    if (values.firstName || values.lastName) {
      this.setState({
        [values.location]: values,
        navBar: {
          ...this.state.navBar,
          firstName: values.firstName,
          lastName: values.lastName
        }
      });
    } else if (values.role) {
      this.setState({
        [values.location]: values,
        navBar: {
          ...this.state.navBar,
          role: values.role
        }
      });
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
    axios.get("/user").then(response => {
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
            // pass in user id from passport deserializer to call inital project
            this.callProject(_id);
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

  callProject(userID) {
    console.log("Hitting user index callProject for id: ", userID);
    // if (this.state.userInfo._id) {
    axios
      .post("/user/callProject", { ownerID: userID })
      .then(response => {
        console.log("Server response from get user project: ", response.data);
        this.setState({
          project: response.data,
          //NEED TO REMOVE THIS BEFORE PRODUCTION PUSH
          currentLocation: "/user/project"
        });
      })
      .catch(error => {
        console.log("Get user project error: ", error);
      });
    // }
  }

  render() {
    //console.log(this.props);
    //console.log("this.state in user index", this.state);
    const {
      currentLocation,
      userInfo,
      skillSlider,
      roleChoice,
      navBar,
      project
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
                <Project addProject={this.addProject} userID={userInfo._id} />
              )}
              {currentLocation === "/user/invite" && (
                <Project inviteProject={this.callProject} />
              )}
              {currentLocation === "/user/project" && (
                <Project
                  callProject={this.callProject}
                  location={currentLocation}
                  project={project}
                />
              )}
              {currentLocation === "/user/complete" && (
                <Project
                  callProject={this.callProject}
                  location={currentLocation}
                  project={project}
                  complete={true}
                />
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
