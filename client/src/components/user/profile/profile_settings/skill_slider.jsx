import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

import Button from "@material-ui/core/Button";

import axios from "axios";

import { withSnackbar } from "notistack";

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
  constructor(props) {
    super(props);
    this.state = {
      location: "skillSlider",
      angular: this.props.display.angular || 0,
      css: this.props.display.css || 0,
      html: this.props.display.html || 0,
      java: this.props.display.java || 0,
      javascript: this.props.display.javascript || 0,
      nodejs: this.props.display.nodejs || 0,
      python: this.props.display.python || 0,
      reactjs: this.props.display.reactjs || 0
    };
    //console.log("checking this prop in slider", this.props);
  }

  handleChange = name => (e, value) => {
    this.setState({
      [name]: value
    });
  };

  handleUpdate = event => {
    //console.log("hitting update on skill slider", this.props.display._id);
    //console.log(this.state);
    event.preventDefault();
    const {
      angular,
      css,
      html,
      java,
      javascript,
      nodejs,
      python,
      reactjs
    } = this.state;
    axios
      .post("/update/user", {
        id: this.props.display._id,
        angular: angular,
        css: css,
        html: html,
        java: java,
        javascript: javascript,
        nodejs: nodejs,
        python: python,
        reactjs: reactjs
      })
      .then(response => {
        //console.log("skill slider update response: ", response);
        if (response.status === 200) {
          this.props.onChildUpdate(this.state);
        }
        this.props.enqueueSnackbar("Skill Settings successfully updated.", {
          variant: "success"
        });
      })
      .catch(error => {
        //console.log("skill slider update error: ", error);
      });
    //need validation on profile, github, portfolio, password and newPassword
  };

  render() {
    const { classes } = this.props;
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
                    {this.state[keyName]}
                  </span>
                }
              </Typography>
              <Slider
                // classes={{ container: classes.slider }}
                value={this.state[keyName]}
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
          onClick={this.handleUpdate}
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

export default withSnackbar(withStyles(styles)(SkillSlider));
