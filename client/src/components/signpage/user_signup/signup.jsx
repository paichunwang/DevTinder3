import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Icon } from "semantic-ui-react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

//show/hide password
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Slide from "@material-ui/core/Slide";

import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

//route caller
import axios from "axios";

//external CSS for signup over-ride
import "./signup.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "-webkit-left"
  },
  margin: {
    margin: theme.spacing.unit
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
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
      password: "",
      loading: false,
      success: false,
      firstNameValid: false,
      lastNameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      formError: false
    };
    //this binds the change and submit function to the window
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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

  handleValidation() {
    const {
      fname,
      lname,
      email,
      password,
      firstNameValid,
      lastNameValid,
      emailValid,
      passwordValid
    } = this.state;

    if (fname.length > 0) {
      this.setState({ firstNameValid: true });
      this.setState({ firstNameError: false });
    } else {
      this.setState({ firstNameError: true });
    }
    if (lname.length > 0) {
      this.setState({ lastNameValid: true });
      this.setState({ lastNameError: false });
    } else {
      this.setState({ lastNameError: true });
    }
    const regexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (regexp.test(email)) {
      this.setState({ emailValid: true });
      this.setState({ emailError: false });
    } else {
      this.setState({ emailError: true });
    }
    if (password.length >= 6) {
      this.setState({ passwordValid: true });
      this.setState({ passwordError: false });
    } else {
      this.setState({ passwordError: true });
    }

    if (firstNameValid && lastNameValid && emailValid && passwordValid) {
      console.log("All forms are valid");
    } else {
      console.log("something invalid");
    }
  }

  handleSubmit() {
    this.handleValidation();

    if (this.state.formValid) {
      if (!this.state.loading) {
        this.setState(
          {
            success: false,
            loading: true
          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({
                loading: false,
                success: true
              });
            }, 2000);
          }
        );
      }
    } else {
      console.log("FORM NOT VALID");
    }

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
    //       console.log(response);
    //       if (!response.data.error) {
    //         axios
    //           .post("/user/login", {
    //             email: this.state.email,
    //             password: this.state.password
    //           })
    //           .then(response => {
    //             // console.log("hitting login post");
    //             window.location.pathname = "/login";
    //           })
    //           .catch(error => {});
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
    const {
      loading,
      success,
      firstNameValid,
      lastNameValid,
      emailValid,
      passwordValid,
      firstNameError,
      lastNameError,
      emailError,
      passwordError
    } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    const validatorCall = {
      fname: firstNameError,
      lname: lastNameError,
      email: emailError,
      password: passwordError
    };

    return (
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <div className="column" style={columnStyle}>
          <div>
            <div className="login_page_title">
              <p>
                <Icon className="user circle" name="user circle" size="huge" />
              </p>
              <h3>Signup for DevTinder</h3>
            </div>
            {Object.keys(Values).map((keyName, keyIndex) => {
              if (keyName !== "password") {
                return (
                  <div key={keyIndex}>
                    <TextField
                      error={validatorCall[keyName]}
                      required
                      disabled={this.state.loading}
                      style={inputStyle}
                      name={keyName}
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
                      error={validatorCall[keyName]}
                      required
                      name={keyName}
                      disabled={this.state.loading}
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
            <p style={{ color: "gray" }}>
              By clicking Join now, you agree to DevTinder's User Agreement,
              Privacy Policy, and Cookie Policy
            </p>
            <div className={classes.wrapper}>
              <button
                style={singupStyle}
                className={buttonClassname + "ui secondary button"}
                disabled={loading}
                onClick={this.handleSubmit}
                // type="submit"
              >
                Join now
              </button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
            <hr className="hr-text" data-content="OR" />
            <div>
              <p style={{ padding: "20px 0px 0px" }}>
                Already on DevTinder? Sign In{" "}
              </p>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
