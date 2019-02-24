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
      redirectTo: null,
      id: this.props.display.id,
      profile: this.props.display.profile,
      fname: this.props.display.firstName,
      lname: this.props.display.lastName,
      email: this.props.display.email,
      github: this.props.display.github,
      protfolio: this.props.display.protfolio,
      password: "Enter current password here ...",
      newPassword: this.props.display.newPassword
    };
    console.log("account setting props: ", this.props);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleUpdate = event => {
    //   something here to catch update on the profile attribute and check if password change, or all validation is correct
    console.log("hitting account handleupdate");
    console.log(this.state);
    event.preventDefault();
    axios
      .post("/update/user", {
        id: this.state.id,
        firstName: this.state.fname,
        lastName: this.state.lname,
        profile: this.state.profile,
        github: this.state.github,
        protfolio: this.state.protfolio
      })
      .then(response => {
        console.log("login response: ", response);
        if (response.status === 200) {
          // axios
          //   .get("/update/user/render", { params: { id: this.state.id } })
          //   .then(response => {
          //     if (response.status === 200) {
          //       console.log("Set state for user");
          //       this.setState({
          //         id: this.state.id,
          //         firstName: this.state.fname,
          //         lastName: this.state.lname,
          //         profile: this.state.profile,
          //         github: this.state.github,
          //         protfolio: this.state.protfolio
          //       });
          //     }
          //   })
          //   .catch(error => {
          //     console.log("user id render error: ", error);
          //   });
          // this.setState(prevState=>({
          //   users: [newUser, ...prevState.users]
          // }))
          // console.log(response.data);
          // console.log(this.state.firstName);
        }
      })
      .catch(error => {
        console.log("user account page update error: ", error);
      });
    //need validation on profile, github, protfolio, password and newPassword
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      // console.log(this.state); // this is the id for update call
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
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
