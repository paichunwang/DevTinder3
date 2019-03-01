import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import axios from "axios";

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
// import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

// const update_button = {
//   // border: "1px red solid",
//   width: "100%",
//   margin: "10px 25px"
// };

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
            value={actionThis.state[keyName]}
            // helperText=""
            // rows="3"
            // multiline
            required
            error={actionThis.state.errorOn.projectName}
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
          error={actionThis.state.errorOn.skillReq}
          component="fieldset"
          className={classes.formControl}
        >
          <FormLabel component="legend" style={{ padding: "0px" }}>
            <p style={{ margin: "0px" }}>
              Please check at least one requirement
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
                      value={keyName}
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
            error={actionThis.state.errorOn.setBudget}
            fullWidth
          >
            <InputLabel htmlFor="adornment-amount">
              Please enter digits only
            </InputLabel>
            <Input
              id="adornment-amount"
              value={actionThis.state.budget}
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
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid}>
            <DatePicker
              disablePast={true}
              margin="normal"
              label="Date picker"
              value={actionThis.state.selectedDate}
              onChange={actionThis.handleDateChange}
              variant="outlined"
              error={actionThis.state.errorOn.setDue}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      );
    default:
      return "Unknown step";
  }
};

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
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
      budget: "",
      selectedDate: new Date(),
      errorOn: {
        projectName: false,
        skillReq: false,
        setBudget: false,
        setDue: false
      }
    };
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleProjectInfoChange = this.handleProjectInfoChange.bind(this);
  }

  handleNext = () => {
    //Project Information Checker
    if (this.state.activeStep === 0) {
      if (this.state.projectName.length < 3) {
        // console.log("Error on Project Name");
        this.setState(state => ({
          errorOn: { projectName: true }
        }));
      } else {
        this.setState(state => ({
          activeStep: state.activeStep + 1
        }));
      }
    }

    //Skill Requirement Checker *NOTE THIS IS A REVERSE SETTER
    if (this.state.activeStep === 1) {
      if (
        this.state.angular ||
        this.state.css ||
        this.state.html ||
        this.state.java ||
        this.state.javascript ||
        this.state.nodejs ||
        this.state.python ||
        this.state.reactjs
      ) {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          errorOn: { skillReq: false }
        }));
      } else {
        // console.log("Error on Skill Requirement");
        this.setState(state => ({
          errorOn: { skillReq: true }
        }));
      }
    }

    //Project Budget Checker
    if (this.state.activeStep === 2) {
      // console.log("Hitting 2");
      if (this.state.budget.length < 1) {
        // console.log("Error on budget");
        this.setState(state => ({
          errorOn: { setBudget: true }
        }));
      } else {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          errorOn: { setBudget: false }
        }));
      }
    }

    // console.log("add project user id", this.props.userID);

    //Project Post
    if (this.state.activeStep === 3) {
      // console.log("Posting to MongoDB", this.props.userID._id);
      // console.log(
      //   "Getting all true skills",
      //   Object.keys(skill_req).filter(key => this.state[key])
      // );
      // /user/addProject routes
      axios
        .post("/user/addProject", {
          ownerID: this.props.userID,
          projectName: this.state.projectName,
          projectDescription: this.state.projectDescription,
          projectSkillReq: Object.keys(skill_req).filter(
            key => this.state[key]
          ),
          projectBudget: this.state.budget,
          projectDue: this.state.selectedDate,
          projectInit: new Date()
        })
        .then(response => {
          // console.log("login response: ", response);
          this.setState(state => ({
            activeStep: state.activeStep + 1
          }));
        })
        .catch(error => {
          console.log("add project page error: ", error);
        });
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
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
      budget: "",
      selectedDate: new Date() + 1
    });
  };

  handleProjectInfoChange = event => {
    if (event.target.name === "projectName") {
      if (event.target.value.length >= 3) {
        // console.log("hitting project change value checker: PASS");
        this.setState({
          [event.target.name]: event.target.value,
          errorOn: { projectName: false }
        });
      } else {
        // console.log("hitting project change value checker: FAIL");
        this.setState({
          [event.target.name]: event.target.value
        });
        this.setState({
          [event.target.name]: event.target.value,
          errorOn: { projectName: true }
        });
      }
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  handleSkillChange = name => event => {
    //user filter to catch if skill req is < 1 and return true errrOn
    this.setState({ [name]: event.target.checked });
  };

  handleBudgetChange = name => event => {
    this.setState({ [name]: parseInt(event.target.value) });
  };

  handleDateChange = date => {
    // console.log("the date in date changer", date);
    this.setState({ selectedDate: date });
  };

  componentDidMount() {
    this.handleCallproject();
  }

  handleCallproject() {
    this.props.callProject();
  }

  render() {
    // console.log("the THIS of class Profile", this);
    // console.log(this.state);
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
    // console.log("addproject props: ", this.props);
    return (
      <div
        className={classes.container}
        style={{
          // border: "1px red solid",
          borderRadius: 4,
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
                      {activeStep === steps.length - 1 ? "Add Project" : "Next"}
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
      </div>
    );
  }
}

AddProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProject);
