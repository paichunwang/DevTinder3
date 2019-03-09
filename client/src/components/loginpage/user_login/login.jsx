import React, { Component } from "react";
import { Input, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./login.css";
import Slide from "@material-ui/core/Slide";

import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";

class Login extends Component {
  //need to check if login is active
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      email: null,
      password: null,
      serverError: false
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

  handleRedirect = value => {
    this.props.handleRedirect(value);
  };

  //axios post for user login
  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log("handleSubmit with ", this.state.email + this.state.password);

    const loginEmailError = !email ? true : false;
    const loginPasswordError = !password ? true : false;
    const formValid = !loginEmailError && !loginPasswordError ? true : false;

    // console.log(loginEmailError, loginPasswordError, formValid);

    this.setState(
      {
        loginEmailError: loginEmailError,
        loginPasswordError: loginPasswordError,
        formValid: formValid
      },
      () => {
        if (formValid) {
          axios
            .post("/user/login", {
              email: this.state.email,
              password: this.state.password
            })
            .then(response => {
              //console.log("login response data: ", response.data);
              if (response.status === 200) {
                this.handleRedirect("users");
              }
            })
            .catch(error => {
              this.setState({
                serverError: true
              });
            });
        } else {
          this.setState({
            serverError: false
          });
        }
      }
    );
  }

  render() {
    const { loginEmailError, loginPasswordError, serverError } = this.state;
    const helperTextValues = {
      emailEmpty: "Email is required for login",
      passwordEmpty: "Password is required for login",
      serverError: "Incorrect Email or Password"
    };

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
              <TextField
                error={loginEmailError || serverError}
                className="emailInput"
                id="input-with-icon-textfield"
                name="email"
                fullWidth
                helperText={
                  loginEmailError
                    ? helperTextValues.emailEmpty
                    : serverError
                    ? helperTextValues.serverError
                    : ""
                }
                label="Email"
                placeholder="ie: John@google.com"
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
              <p />
              <TextField
                error={loginPasswordError || serverError}
                className="passwordInput"
                id="input-with-icon-textfield"
                name="password"
                type="password"
                fullWidth
                helperText={
                  loginPasswordError
                    ? helperTextValues.passwordEmpty
                    : serverError
                    ? helperTextValues.serverError
                    : ""
                }
                label="Password"
                placeholder="ie: maryklover123"
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  )
                }}
              />
              <p />
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
