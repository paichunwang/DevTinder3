import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

import Button from "@material-ui/core/Button";

const update_button = {
  // border: "1px red solid",
  width: "100%",
  margin: "30px 25px 10px"
};

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
      skill: {
        angular: 0,
        css: 0,
        html: 0,
        java: 0,
        javascript: 0,
        nodejs: 0,
        python: 0,
        reactjs: 0
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
              style={{ width: "100%", padding: "10px 25px" }}
            >
              <Typography
                component={"span"}
                id="label"
                style={{
                  width: "100%",
                  paddingBottom: "10px",
                  textAlign: "left"
                }}
              >
                {skills_values[keyName]}

                {
                  <span
                    style={{ fontSize: "8pt", color: "grey", float: "right" }}
                  >
                    {" Level of Mastery: "}
                    {this.state.skill[keyName]}
                  </span>
                }
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
        <div
          style={{
            color: "grey",
            fontSize: "7pt",
            padding: "0px",
            margin: "20px 0px 0px",
            textAlign: "center",
            width: "100%"
          }}
        >
          <span>Level of mastery range from 0 (UNFAMILIAR) to 10 (EXPERT)</span>{" "}
        </div>
        <Button
          style={update_button}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Update Indicated Skills
        </Button>
      </div>
    );
  }
}

SkillSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SkillSlider);
