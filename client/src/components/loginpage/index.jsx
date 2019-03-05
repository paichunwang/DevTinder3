import UserLogin from "./user_login/login";
import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // redirectTo: null
    };

    // this.getCookie = this.getCookie.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getCookie();
  }

  handleRedirect = value => {
    this.props.redirect(value);
  };

  //this call is not passported
  getCookie() {
    axios.get("/user/").then(response => {
      //console.log("Get user response: ");
      //console.log(response.data.user);
      //here need to pass id back from passport call
      if (response.data.user) {
        this.handleRedirect("users");
      }
    });
  }

  render() {
    return (
      <div>
        <UserLogin handleRedirect={this.handleRedirect} />
      </div>
    );
  }
}

export default index;
