import React, { Component } from "react";
import { Input, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Slide from "@material-ui/core/Slide";

import Typography from "@material-ui/core/Typography";

class Login extends Component {
  //need to check if login is active
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(values) {
    this.props.handleRedirect(values);
  }

  handleChange(event) {
    // //console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //axios post for user login
  handleSubmit(event) {
    event.preventDefault();
    //console.log("handleSubmit with ", this.state.email + this.state.password);
    axios
      .post("/user/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        //console.log("login response data: ", response.data);
        if (response.status === 200) {
          this.setState({
            // userInfo: response.data,
            redirectTo: "/users"
          });
          // console.log("post login user response: ", response.data);
        }
      })
      .catch(error => {
        //console.log("Login page .catch error: ", error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      //console.log("Hiting loginpage user_login login Redirect");
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
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
                  name="email"
                  className="emailInput"
                  label="Email"
                  iconPosition="left"
                  icon="envelope"
                  placeholder="ie: John@google.com"
                  onChange={this.handleChange}
                />
              </div>
              <div className="rowPassword">
                <Input
                  name="password"
                  type="password"
                  className="passwordInput"
                  label="Password"
                  iconPosition="left"
                  icon="key"
                  placeholder="ie: maryklover123"
                  onChange={this.handleChange}
                />
              </div>
              <div className="rowLogaction">
                <div className="login">
                  <button
                    className="ui secondary button loginAction"
                    onClick={this.handleSubmit}
                  >
                    Sign In
                  </button>
                </div>
                <div className="forgotpassword">
                  <button className="ui basic button forgotAction">
                    Forgot Password?
                  </button>
                </div>
                <div className="newDevtinder">
                  <Typography
                    onClick={() => {
                      this.handleRedirect("signup");
                    }}
                    style={{ cursor: "pointer" }}
                    color="primary"
                    variant="button"
                    gutterBottom
                  >
                    Don't have a accounnt? REGEISTER HERE
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      );
    }
  }
}

export default Login;
