import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

import axios from "axios";

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
      redirectTo: null,
      id: this.props.display._id,
      profile: this.props.display.profile,
      firstName: this.props.display.firstName,
      lastName: this.props.display.lastName,
      email: this.props.display.email,
      github: this.props.display.github,
      portfolio: this.props.display.portfolio,
      password: "",
      newPassword: "",
      placeholder: {
        profile: this.props.display.profile,
        firstName: this.props.display.firstName,
        lastName: this.props.display.lastName,
        email: this.props.display.email,
        github: this.props.display.github,
        portfolio: this.props.display.portfolio,
        password: "Enter current password",
        newPassword: "Enter new password"
      }
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
    //   something here to catch update on the profile attribute and check if password change, or all validation is correct
    //console.log("hitting account handleupdate");
    //console.log(this.state);
    event.preventDefault();
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
          this.props.onChildUpdate(this.state);
        }
      })
      .catch(error => {
        //console.log("user account page update error: ", error);
      });
    //need validation on profile, github, portfolio, password and newPassword
  };

  componentDidMount() {
    //console.log("hitting did mount on account setting");
    this.setState({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      profile: this.state.profile,
      github: this.state.github,
      portfolio: this.state.portfolio
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      const { classes } = this.props;
      const { placeholder } = this.state;
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
                    profile_values[keyName] +
                    ": Login Credential - Edit Disabled"
                  }
                  style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
                  placeholder={this.state[keyName]}
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
                  style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
                  placeholder={placeholder[keyName]}
                  // value={this.state[keyName]}
                  // helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  // InputLabelProps={{
                  //   shrink: true
                  // }}
                  type="password"
                  onChange={this.handleChange}
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
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
