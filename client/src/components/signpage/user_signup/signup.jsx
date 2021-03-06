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

import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

// import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

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
  password: "Password (6 or more characters)"
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
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      loading: false,
      success: false,
      formValid: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false
    };
    //this binds the change and submit function to the window
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleRedirect(values) {
    this.props.handleRedirect(values);
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

  handleSubmit() {
    const { fname, lname, email, password } = this.state;
    const regexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const firstNameError = !fname ? true : false;
    const lastNameError = !lname ? true : false;
    const emailError = !email || !regexp.test(email) ? true : false;
    const passwordError = !password || password.length < 6 ? true : false;
    const formValid =
      !firstNameError && !lastNameError && !emailError && !passwordError
        ? true
        : false;

    this.setState(
      {
        firstNameError: firstNameError,
        lastNameError: lastNameError,
        emailError: emailError,
        passwordError: passwordError,
        formValid: formValid
      },
      // function in setstate calls comparison and runs off the result
      () => {
        // console.log(this.state);
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
          axios
            .post("/user/", {
              firstname: this.state.fname,
              lastname: this.state.lname,
              email: this.state.email.toLowerCase(),
              password: this.state.password
            })
            .then(response => {
              // console.log(response);
              if (!response.data.error) {
                axios
                  .post("/user/login", {
                    email: this.state.email,
                    password: this.state.password
                  })
                  .then(response => {
                    // console.log("hitting login post");
                    this.handleRedirect("users");
                  })
                  .catch(error => {});
              } else {
                console.log("account with email already exist");
                this.setState({ emailError: true }, () => {
                  console.log(this.state);
                });
              }
            })
            .catch(error => {
              console.log("signup error: ");
              console.log(error);
            });
        } else {
          console.log("FORM NOT VALID");
        }
      }
    );
  }

  render() {
    const {
      loading,
      firstNameError,
      lastNameError,
      emailError,
      passwordError
    } = this.state;
    const { classes } = this.props;

    const validatorValues = {
      fname: firstNameError,
      lname: lastNameError,
      email: emailError,
      password: passwordError
    };

    const helperTextValues = {
      fname: "Required field cannot be left blank",
      lname: "Required field cannot be left blank",
      email: "Invalid Email address",
      email1: "Account with email already exists",
      password: "Password must be 6 or more characters"
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
                      error={validatorValues[keyName]}
                      required
                      disabled={this.state.loading}
                      helperText={
                        validatorValues[keyName]
                          ? helperTextValues[keyName]
                          : ""
                      }
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
                      error={validatorValues[keyName]}
                      required
                      helperText={
                        validatorValues[keyName]
                          ? helperTextValues[keyName]
                          : ""
                      }
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
                className={"ui secondary button"}
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
              <Typography
                onClick={() => {
                  this.handleRedirect("login");
                }}
                style={{ cursor: "pointer" }}
                color="primary"
                variant="button"
                gutterBottom
              >
                Already have an account? Sign in here!
              </Typography>
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
