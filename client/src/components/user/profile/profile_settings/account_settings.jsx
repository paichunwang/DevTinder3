import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import { withSnackbar } from "notistack";

import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
//show/hide password
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const update_button = {
  // border: "1px red solid",
  width: "100%",
  margin: "10px 25px"
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

const profile_values = {
  profile: "Profile Image Link",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  github: "Github Link",
  portfolio: "Portfolio Link",
  password: "Current Password",
  newPassword: "New Password"
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "userInfo",
      id: this.props.display._id,
      profile: this.props.display.profile,
      firstName: this.props.display.firstName,
      lastName: this.props.display.lastName,
      email: this.props.display.email,
      github: this.props.display.github,
      portfolio: this.props.display.portfolio,
      password: "",
      newPassword: "",
      showPassword: { password: false, newPassword: false }
      // placeholder: {
      //   profile: this.props.display.profile,
      //   firstName: this.props.display.firstName,
      //   lastName: this.props.display.lastName,
      //   email: this.props.display.email,
      //   github: this.props.display.github,
      //   portfolio: this.props.display.portfolio,
      //   password: "Enter current password",
      //   newPassword: "Enter new password"
      // }
    };
    //console.log("account setting props: ", this.props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log("this.state", this.state);
  };

  handleUpdate = event => {
    event.preventDefault();

    const { password, newPassword } = this.state;

    if (password || newPassword || (password && newPassword)) {
      if (password && !newPassword) {
        if (password.length < 6) {
          this.props.enqueueSnackbar("Please enter a new password.", {
            variant: "error"
          });
        }
      } else if (!password && newPassword) {
        if (newPassword.length < 6) {
          this.props.enqueueSnackbar("Please enter your current password", {
            variant: "error"
          });
        }
      } else {
        if (password.length < 6) {
          this.props.enqueueSnackbar("Current Password length too short.", {
            variant: "error"
          });
        } else if (newPassword.length < 6) {
          this.props.enqueueSnackbar("New Password length too short.", {
            variant: "error"
          });
        } else {
          axios
            .post("/update/user", {
              id: this.state.id,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              profile: this.state.profile,
              github: this.state.github,
              portfolio: this.state.portfolio,
              password: this.state.password,
              newPassword: this.state.newPassword
            })
            .then(response => {
              console.log("login response: ", response);
              if (response.status === 200) {
                // console.log(response);
                this.setState({ password: "", newPassword: "" }, () => {
                  console.log(this.state);
                  this.props.onChildUpdate(this.state);
                  this.props.enqueueSnackbar(
                    "Account Settings + Pass successfully updated.",
                    {
                      variant: "success"
                    }
                  );
                });
              }
            })
            .catch(error => {
              this.displayServerError();
            });
        }
      }
    } else {
      axios
        .post("/update/user", {
          id: this.state.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          profile: this.state.profile,
          github: this.state.github,
          portfolio: this.state.portfolio
        })
        .then(response => {
          //console.log("login response: ", response);
          if (response.status === 200) {
            console.log(response);
            this.props.onChildUpdate(this.state);
            this.props.enqueueSnackbar(
              "Account Settings successfully updated.",
              {
                variant: "success"
              }
            );
          } else {
            this.props.enqueueSnackbar("Account update error.", {
              variant: "error"
            });
          }
        })
        .catch(error => {});
    }
  };

  displayServerError() {
    this.props.enqueueSnackbar("Invalid Current Password.", {
      variant: "error"
    });
  }

  handleClickShowPassword = keyName => {
    this.setState(state => ({
      showPassword: {
        ...state.showPassword,
        [keyName]: !state.showPassword[keyName]
      }
    }));
  };

  render() {
    const { classes } = this.props;
    const { passwordError } = this.state;
    return (
      <div
        className={classes.container}
        // style={{ border: "1px red solid" }}
      >
        {Object.keys(profile_values).map((keyName, keyIndex) => {
          if (keyName === "email") {
            return (
              <TextField
                key={keyIndex}
                id={"outlined-full-width " + keyIndex}
                label={
                  profile_values[keyName] + " Edit Disabled : Login Credential"
                }
                style={{
                  margin: "10px 25px",
                  textAlign: "-webkit-left"
                }}
                value={this.state[keyName]}
                disabled
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            );
          } else if (keyName === "password" || keyName === "newPassword") {
            return (
              <TextField
                key={keyIndex}
                name={Object.keys(profile_values)[keyIndex]}
                id={"outlined-full-width " + keyIndex}
                label={profile_values[keyName] + ": 6 or more characters"}
                style={{
                  margin: "10px 25px",
                  textAlign: "-webkit-left",
                  width: "100%"
                }}
                value={this.state[keyName]}
                // placeholder={placeholder[keyName]}
                fullWidth
                error={passwordError}
                margin="normal"
                variant="outlined"
                type={this.state.showPassword[keyName] ? "text" : "password"}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => {
                          this.handleClickShowPassword(keyName);
                        }}
                      >
                        {this.state.showPassword[keyName] ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            );
          } else {
            return (
              <TextField
                key={keyIndex}
                name={Object.keys(profile_values)[keyIndex]}
                id={"outlined-full-width " + keyIndex}
                label={profile_values[keyName]}
                style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
                // placeholder={placeholder[keyName]}
                value={this.state[keyName]}
                // helperText=""
                fullWidth
                margin="normal"
                variant="outlined"
                // InputLabelProps={{
                //   shrink: true
                // }}
                onChange={this.handleChange}
              />
            );
          }
        })}
        <Button
          style={update_button}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleUpdate}
        >
          Update Account Settings
        </Button>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(Profile));
