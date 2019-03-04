import UserLogin from "./user_login/login";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null
    };

    // this.getCookie = this.getCookie.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getCookie();
  }

  //this call is not passported
  getCookie() {
    axios.get("/user/").then(response => {
      //console.log("Get user response: ");
      //console.log(response.data.user);
      //here need to pass id back from passport call
      if (response.data.user) {
        this.setState({
          redirectTo: "/users"
        });
      } else {
        //console.log("No user found.");
        this.setState({
          redirectTo: null
        });
      }
    });
  }

  render() {
    if (this.state.redirectTo) {
      //console.log("Hiting loginpage user_login login Redirect");
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <UserLogin handleRedirect={this.props.redirect} />
        </div>
      );
    }
  }
}

export default index;
