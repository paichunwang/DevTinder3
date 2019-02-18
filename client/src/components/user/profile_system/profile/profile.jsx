import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
  github: "Github Link",
  protfolio: "Protfolio Link",
  password: "Current Password",
  newPassword: "New Password"
};

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        profile: "State Profile",
        fname: "State FName",
        lname: "State LName",
        github: "State Github",
        protfolio: "State Protfolio",
        password: "State password // this will need to be hashed or dummy code",
        newPassword: "Password must be 6 letter and more"
      }
    };
  }

  handleChange = name => (e, value) => {
    ///   something here to catch change on the profile attribute with value, placeholder will keep in place of previous
  };

  handleUpdate = () => {
    //   something here to catch update on the profile attribute and check if password change, or all validation is correct
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.container}
        // style={{ border: "1px red solid" }}
      >
        {Object.keys(profile_values).map((keyName, keyIndex) => {
          return (
            <TextField
              key={keyIndex}
              id="outlined-full-width"
              label={profile_values[keyName]}
              style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
              placeholder={this.state.user[keyName]}
              // value={this.state.user[keyName]}
              // helperText=""
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          );
        })}
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
