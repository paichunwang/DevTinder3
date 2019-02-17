import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    "background-color": "#eeeeee",
    "margin-left": "calc(120px + 15%) ",
    "margin-right": "15%",
    "margin-top": "20px",
    "border-radius": "10px"
  }
});

const profile_values = {
  profile: "Profile Image Link",
  fname: "First Name",
  lname: "Last Name",
  github: "Github Link",
  protfolio: "Protfolio Link",
  password: "Current Password"
};

const skills_values = {
  angular: "Angular.io",
  css: "Cascading Style Sheets (CSS)",
  html: "Hypertext Markup Language (HTML)",
  java: "Java",
  javascript: "Javascript .js",
  nodejs: " Node.js",
  python: "Python",
  reactjs: "React.js"
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
        password: "State password // this will need to be hashed or dummy code"
      },
      skill: {
        angular: 1,
        css: 2,
        html: 3,
        java: 4,
        javascript: 5,
        nodejs: 6,
        python: 7,
        reactjs: 8
      }
    };
  }

  handleChange = name => (e, value) => {
    console.log(name, value);
    console.log("Pre State: ", this.state.skill.angular);

    this.setState({
      skill: { ...this.state.skill, [name]: value }
      // [name]: value // --> Important bit here: This is how you set the value of sliders
    });

    console.log("Post State: ", this.state.skill.angular);
  };

  render() {
    const { classes } = this.props;
    // const { angular, css } = this.state.skill;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <div
            style={{
              borderRadius: "5px 5px 0px 0px",
              width: "100%",
              padding: "20px 0px",
              textAlign: "center"
            }}
          >
            HELLO
          </div>
          {Object.keys(profile_values).map((keyName, keyIndex) => {
            return (
              <TextField
                key={keyIndex}
                id="outlined-full-width"
                label={profile_values[keyName]}
                style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
                placeholder={this.state.user[keyName]}
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
          {Object.keys(skills_values).map((keyName, keyIndex) => {
            /* console.log(Object.keys(skills_values)[keyIndex]); //this returns the key for onDragEnd to set new state */

            return (
              <div
                className={keyName}
                key={keyIndex}
                style={{ width: "100%", padding: "10px" }}
              >
                <Typography id="label">{skills_values[keyName]}</Typography>
                <Slider
                  // classes={{ container: classes.slider }}
                  value={this.state.skill[keyName]}
                  min={0}
                  max={10}
                  step={1}
                  onChange={this.handleChange(
                    Object.keys(skills_values)[keyIndex]
                  )}
                />
              </div>
            );
          })}
          {/* <div className={classes.root}>
            <Typography id="label">Slider label</Typography>
            <Slider
              classes={{ container: classes.slider }}
              value={slider1}
              aria-labelledby="label"
              onChange={this.handleChange("slider1")}
            />
          </div> */}
        </form>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
