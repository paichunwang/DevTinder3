import React, { Component } from "react";
import { Input, Icon } from "semantic-ui-react";
import "./login.css";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="column">
          <div className="login_page_title">
            <p>
              <Icon className="computerIcon" name="computer" size="huge" />
            </p>
            devTinder
          </div>
          <div className="rowUser">
            <Input
              className="usernameInput"
              label="Username"
              iconPosition="left"
              icon="user"
              placeholder="ie: Johnsmith123"
            />
          </div>
          <div className="rowPassword">
            <Input
              type="password"
              className="passwordInput"
              label="Password"
              iconPosition="left"
              icon="key"
              placeholder="ie: maryklover123"
            />
          </div>
          <div className="rowLogaction">
            <div className="login">
              <button className="ui secondary button loginAction">
                Sign In
              </button>
            </div>
            <div className="forgotpassword">
              <button className="ui basic button forgotAction">
                Forgot Password?
              </button>
            </div>
            <div className="newDevtinder">
              <p>New to DevTinder?</p>
              Sign Up and start using DevTinder
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
