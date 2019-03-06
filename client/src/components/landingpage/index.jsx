// import React from "react";
import Gettingstarted from "./main_landingpage/headermain";
import Navigation from "./nav_gettingstarted/navbar";
import Login from "../loginpage/index";
import Signup from "../signpage/index";
import Users from "../user/index";
import Main from "../../App";
import Fade from "@material-ui/core/Fade";

// const Mainpage = () => (
//   state={location: null}
//   <Fade in={true}>
//     <div>
//       <Gettingstarted />
//       <Navigation />
//     </div>
//   </Fade>
// );

// export default Mainpage;

import React, { Component } from "react";
// import User from "../user/index";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = { location: "mainPage" };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(values) {
    // console.log("Hitting set state for main page", values);
    this.setState({ location: values });
  }

  render() {
    const { location } = this.state;
    return (
      <>
        {location === "mainPage" && (
          <Fade in={true}>
            <div>
              <Gettingstarted />
              <Navigation
                login={this.handleRedirect}
                redirect={this.handleRedirect}
              />
            </div>
          </Fade>
        )}
        {location === "main" && <Main />}
        {location === "login" && <Login redirect={this.handleRedirect} />}
        {location === "signup" && <Signup redirect={this.handleRedirect} />}
        {location === "users" && <Users redirect={this.handleRedirect} />}
      </>
    );
  }
}
