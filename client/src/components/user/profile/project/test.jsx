import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return "An ad group contains one or more ads which target a shared set of keywords.";
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return "Unknown step";
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0
  };

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

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
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
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalLinearStepper);


  Object.keys(add_project_inputs).map((keyName, keyIndex) => {
        <TextField
          key={keyIndex}
          name={Object.keys(add_project_inputs)[keyIndex]}
          id={"outlined-full-width " + keyIndex}
          label={add_project_inputs[keyName]}
          style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
          // placeholder={placeholder[keyName]}
          value={this.state[keyName]}
          // helperText=""
          rows="3"
          multiline
          fullWidth
          margin="normal"
          variant="outlined"
          //   onChange={this.handleChange}
        />
      ));


//      else if (keyName === "projectSkillReq") {
//       return (
//         <FormControl
//           key={keyIndex}
//           // required
//           fullWidth
//           error={error}
//           component="fieldset"
//           className={classes.formControl}
//         >
//           <FormLabel component="legend" style={{ padding: "0px" }}>
//             <h6 style={{ margin: "0px" }}>
//               Please select at least one requirement
//             </h6>
//           </FormLabel>
//           <FormGroup style={{ display: "inline-block" }}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={angular}
//                   onChange={this.handleChange("angular")}
//                   value="angular"
//                 />
//               }
//               label="Angular"
//             />
//           </FormGroup>
//           {/* <FormHelperText>You can display an error</FormHelperText> */}
//         </FormControl>
//       );
//     } else {
//       return (
//         <TextField
//           key={keyIndex}
//           name={Object.keys(add_project_inputs)[keyIndex]}
//           id={"outlined-full-width " + keyIndex}
//           label={add_project_inputs[keyName]}
//           style={{ margin: "10px 25px", textAlign: "-webkit-left" }}
//           // placeholder={placeholder[keyName]}
//           value={this.state[keyName]}
//           // helperText=""
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           //   onChange={this.handleChange}
//         />
//       );
//     }
//   });
// }
