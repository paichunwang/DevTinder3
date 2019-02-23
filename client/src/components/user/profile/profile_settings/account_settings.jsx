import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
  fname: "First Name",
  lname: "Last Name",
  email: "Email",
  github: "Github Link",
  protfolio: "Protfolio Link",
  password: "Current Password",
  newPassword: "New Password"
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: {
      id: this.props.display._id,
      profile: this.props.display.profile,
      fname: this.props.display.firstName,
      lname: this.props.display.lastName,
      email: this.props.display.email,
      github: this.props.display.github,
      protfolio: this.props.display.protfolio,
      password: "Enter current password here ...",
      newPassword: this.props.display.newPassword
      // }
    };
  }

  handleChange = event => {
    ///   something here to catch change on the profile attribute with value, placeholder will keep in place of previous
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.name + event.target.value);
  };

  handleUpdate = event => {
    //   something here to catch update on the profile attribute and check if password change, or all validation is correct
    console.log("hitting account handleupdate");
    console.log(this.state);
    event.preventDefault();
    axios
      .post("/user/update", {
        id: this.state.id,
        email: this.state.email,
        firstName: this.state.fname
      })
      .then(response => {
        console.log("login response: ", response);
        if (response.status === 200) {
          this.setState({
            redirectTo: "/user"
          });
        }
      })
      .catch(error => {
        console.log("user account page update error: ", error);
      });
    //need validation on profile, github, protfolio, password and newPassword
  };

  render() {
    // console.log(this.state.user.id); // this is the id for update call
    const { classes } = this.props;
    // const { _id, firstName, lastName, email } = this.props.display;
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
                id="outlined-full-width"
                label={
                  profile_values[keyName] + ": Login Credential - Edit Disabled"
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
          } else {
            return (
              <TextField
                key={keyIndex}
                name={Object.keys(profile_values)[keyIndex]}
                id="outlined-full-width"
                label={profile_values[keyName]}
                style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
                placeholder={this.state[keyName]}
                // value={this.state.user[keyName]}
                // helperText=""
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
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

export default withStyles(styles)(Profile);
