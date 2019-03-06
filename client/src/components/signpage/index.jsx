import UserSignup from "./user_signup/signup";
import React, { Component } from "react";

export default class Signpage extends Component {
  render() {
    return (
      <div>
        <UserSignup handleRedirect={this.props.redirect} />
      </div>
    );
  }
}
