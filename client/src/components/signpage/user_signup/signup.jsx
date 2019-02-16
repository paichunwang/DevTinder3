import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Icon } from "semantic-ui-react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import "./signup.css";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { 500: "#3498db" },
    error: { 500: "#FFFFFF" }
  }
});

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "-webkit-left"
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const Values = {
  fname: "First Name",
  lname: "Last Name",
  email: "Email",
  password: "Password (6 or more character)"
};

const columnStyle = {
  width: "30%",
  backgroundColor: "#efefef",
  margin: "10vh 0vh"
  // background-color: #ffffff60;
  // margin-top: 20vh;
  // padding: 50px;
  // border-radius: 15px;
};

const inputStyle = { textAlign: "-webkit-left" };

const passwordStyle = {
  // padding: "16.5px 0px",
  margin: "16.5px 0px",
  width: "100%",
  textAlign: "-webkit-left"
};

const singupStyle = {
  width: "100%",
  padding: "16.5px 0px",
  margin: "16px 0px"
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: ""
    };
    //this binds the change and submit function to the window
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //update state with value from input field
  handleChange(event) {
    console.log(
      "Hitting state change method",
      event.target.name,
      event.target.value
    );
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //change true false with show password
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  //get values when user click Join now
  handleSubmit(event) {
    console.log("sign-up handleSubmit");
    console.log(
      "First Name: " + this.state.fname,
      "Last Name: " + this.state.lname,
      "Email:" + this.state.email,
      "Password: " + this.state.password
    );

    event.preventDefault();

    //request to server to add a new username/password
    // axios
    //   .post("/user/", {
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    //   .then(response => {
    //     console.log(response);
    //     if (!response.data.errmsg) {
    //       console.log("successful signup");
    //       this.setState({
    //         //redirect to login page
    //         redirectTo: "/login"
    //       });
    //     } else {
    //       console.log("username already taken");
    //     }
    //   })
    //   .catch(error => {
    //     console.log("signup error: ");
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <div className="column" style={columnStyle}>
        <div>
          <div className="login_page_title">
            <p>
              <Icon className="user circle" name="user circle" size="huge" />
            </p>
            <h3>Signup for DevTinder</h3>
          </div>
          <MuiThemeProvider theme={theme}>
            {Object.keys(Values).map((keyName, keyIndex) => {
              if (keyName !== "password") {
                return (
                  <div key={keyIndex}>
                    <TextField
                      style={inputStyle}
                      name={keyName}
                      // id="outlined-name"
                      //does this id matter? prob near the call for values
                      value={this.state.keyName}
                      onChange={this.handleChange}
                      fullWidth={true}
                      label={Values[keyName]}
                      className={keyName}
                      margin="normal"
                      variant="outlined"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={keyIndex}>
                    <TextField
                      name={keyName}
                      id="outlined-adornment-password"
                      style={passwordStyle}
                      className={keyName}
                      variant="outlined"
                      type={this.state.showPassword ? "text" : "password"}
                      label={Values[keyName]}
                      value={this.state.keyName}
                      onChange={this.handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                            >
                              {this.state.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>
                );
              }
            })}
          </MuiThemeProvider>
          <p style={{ color: "gray" }}>
            By clicking Join now, you agree to DevTinder's User Agreement,
            Privacy Policy, and Cookie Policy
          </p>
          <div className="signup">
            <button
              style={singupStyle}
              className="ui secondary button"
              onClick={this.handleSubmit}
              type="submit"
            >
              Join now
            </button>
          </div>
          <hr className="hr-text" data-content="OR" />
          <div>
            <p>Already on DevTinder? Sign In </p>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
