import React, { Component } from "react";
import PropTypes from "prop-types";

//UI design materialUI and semanticUI
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Icon } from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

//show/hide password
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//route caller
import axios from "axios";

//external CSS for signup over-ride
import "./signup.css";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { 500: "#3498db" },
    error: { 500: "#f44336" }
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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //change true false with show password
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  // handleEmailValidation = email => {
  //   //email address (RFC 2822 mailbox) regex certification
  //   const regexp = new RegExp(
  //     /^((?>[a-zA-Z\d!#$%&'*+\-/=?^_`{|}~]+\x20*|"((?=[\x01-\x7f])[^"\\]|\\[\x01-\x7f])*"\x20*)*(?<angle><))?((?!\.)(?>\.?[a-zA-Z\d!#$%&'*+\-/=?^_`{|}~]+)+|"((?=[\x01-\x7f])[^"\\]|\\[\x01-\x7f])*")@(((?!-)[a-zA-Z\d\-]+(?<!-)\.)+[a-zA-Z]{2,}|\[(((?(?<!\[)\.)(25[0-5]|2[0-4]\d|[01]?\d?\d)){4}|[a-zA-Z\d\-]*[a-zA-Z\d]:((?=[\x01-\x7f])[^\\\[\]]|\\[\x01-\x7f])+)\])(?(angle)>)$/
  //   );
  //   if (regexp.test(email)) {
  //     console.log("email pattern match");
  //   } else {
  //     console.log("email pattern DO NOT match");
  //   }
  // };

  //get values when user click Join now
  handleSubmit(event) {
    // console.log("sign-up handleSubmit");
    // console.log(
    //   "First Name: " + this.state.fname,
    //   "Last Name: " + this.state.lname,
    //   "Email:" + this.state.email,
    //   "Password: " + this.state.password
    // );

    event.preventDefault();

    console.log(event);

    // const regexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    // if (regexp.test(this.state.email)) {
    //   console.log("email pattern match");
    //   // request to server to add a new username/password
    //   axios
    //     .post("/user/", {
    //       firstname: this.state.fname,
    //       lastname: this.state.lname,
    //       email: this.state.email,
    //       password: this.state.password
    //     })
    //     .then(response => {
    //       // console.log(response);
    //       if (!response.data.errmsg) {
    //         console.log("successful signup");
    //         // this.setState({
    //         //   //redirect to login page
    //         //   redirectTo: "/login"
    //         // });
    //       } else {
    //         console.log("account with email already exist");
    //       }
    //     })
    //     .catch(error => {
    //       console.log("signup error: ");
    //       console.log(error);
    //     });
    // } else {
    //   console.log("email pattern DO NOT match");
    // }
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
                      // error={true}
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
            <p style={{ padding: "20px 0px 0px" }}>
              Already on DevTinder? Sign In{" "}
            </p>
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
