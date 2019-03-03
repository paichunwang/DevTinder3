import UserLogin from "./user_login/login";
import React, { Component } from "react";

export default class Loginpage extends Component {
  render() {
    return (
      <div>
        <UserLogin handleRedirect={this.props.redirect} />
      </div>
    );
  }
}
