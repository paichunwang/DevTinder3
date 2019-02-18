import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  }
});

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

class SkillSlider extends React.Component {
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
    // console.log(name, value);
    // console.log("Pre State: ", this.state.skill.angular);

    this.setState({
      skill: { ...this.state.skill, [name]: value }
      // [name]: value // --> Important bit here: This is how you set the value of sliders
    });

    // console.log("Post State: ", this.state.skill[name]);
  };

  handleUpdate = () => {
    //   something here to catch update on the skill slider page
  };

  render() {
    const { classes } = this.props;
    // const { angular, css } = this.state.skill;

    return (
      <div className={classes.container}>
        {Object.keys(skills_values).map((keyName, keyIndex) => {
          return (
            <div
              className={keyName}
              key={keyIndex}
              style={{ width: "100%", padding: "10px" }}
            >
              <Typography
                id="label"
                style={{ width: "100%", paddingBottom: "20px" }}
              >
                {skills_values[keyName]}
              </Typography>
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
      </div>
    );
  }
}

SkillSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SkillSlider);
