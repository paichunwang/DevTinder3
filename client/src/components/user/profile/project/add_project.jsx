import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

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

const add_project_inputs = {
  projectName: "Project Name : (3 or more character)",
  projectDescription: "Project Description : Short Description"
  //   projectSkillReq: "Project Skill Req",
  //   projectDue: "Project Due Date"
};

const skill_req = {
  angular: "Angular",
  css: "CSS",
  html: "HTML",
  java: "Java",
  javascript: "Javascript",
  nodejs: "Node JS",
  python: "Python",
  reactjs: "React JS"
};

function getSteps() {
  return [
    "Project Information",
    "Skill Requirement",
    "Project Budget",
    "Project Due Date"
  ];
}

const getStepContent = (classes, step, actionThis, error, skillList) => {
  switch (step) {
    case 0:
      return Object.keys(add_project_inputs).map((keyName, keyIndex) => {
        return (
          <TextField
            key={keyIndex}
            name={keyName}
            id={"outlined-full-width " + keyIndex}
            label={add_project_inputs[keyName]}
            style={{ textAlign: "-webkit-left" }}
            // placeholder={placeholder[keyName]}
            value={actionThis.state[keyName]}
            // helperText=""
            // rows="3"
            // multiline
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={actionThis.handleProjectInfoChange}
          />
        );
      });
    case 1:
      return (
        //   console.log(action)
        <FormControl
          //   key={keyIndex}
          // required
          fullWidth
          error={error}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend" style={{ padding: "0px" }}>
            <p style={{ margin: "0px" }}>
              Please select at least one requirement
            </p>
          </FormLabel>
          <FormGroup style={{ display: "inline-block" }}>
            {Object.keys(skill_req).map((keyName, keyIndex) => {
              return (
                <FormControlLabel
                  key={keyIndex}
                  control={
                    <Checkbox
                      color="primary"
                      checked={actionThis.state[keyName]}
                      onChange={actionThis.handleSkillChange([keyName])}
                      value="angular"
                    />
                  }
                  label={skill_req[keyName]}
                />
              );
            })}
          </FormGroup>
          {/* <FormHelperText>You can display an error</FormHelperText> */}
        </FormControl>
      );
    case 2:
      return (
        <>
          <FormControl
            style={{ padding: "10px" }}
            className={classes.margin}
            fullWidth
          >
            <InputLabel htmlFor="adornment-amount">
              Project Allocation: in whole dollar amount
            </InputLabel>
            <Input
              id="adornment-amount"
              value={actionThis.state.minBudget}
              onChange={actionThis.handleBudgetChange("budget")}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </>
      );
    case 3:
      return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
};

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2,
      projectName: "",
      projectDescription: "",
      angular: false,
      css: false,
      html: false,
      java: false,
      javascript: false,
      nodejs: false,
      python: false,
      reactjs: false,
      budget: 0
    };
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleProjectInfoChange = this.handleProjectInfoChange.bind(this);
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleProjectInfoChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSkillChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleBudgetChange = name => event => {
    this.setState({ [name]: parseInt(event.target.value) });
  };

  render() {
    console.log("the THIS of class Profile", this);
    console.log(this.state);
    const { classes } = this.props;
    const steps = getSteps();
    const {
      angular,
      css,
      html,
      java,
      javascript,
      nodejs,
      python,
      reactjs,
      activeStep
    } = this.state;
    const skillList = [
      angular,
      css,
      html,
      java,
      javascript,
      nodejs,
      python,
      reactjs
    ];

    const error = skillList.filter(values => values).length < 1;
    return (
      <div
        className={classes.container}
        style={{
          border: "1px red solid",
          padding: "30px",
          backgroundColor: "white"
        }}
      >
        <Stepper
          style={{
            // border: "1px green solid",
            textAlign: "-webkit-left",
            width: "100%"
          }}
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography component={"div"}>
                  {getStepContent(classes, index, this, error, skillList)}
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <div
            style={{
              textAlign: "-webkit-left",
              width: "100%",
              padding: "0 0 0 30px"
            }}
          >
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          </div>
        )}
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

AddProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProject);
