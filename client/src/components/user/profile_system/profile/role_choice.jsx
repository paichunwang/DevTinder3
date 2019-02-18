import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import Button from "@material-ui/core/Button";

const update_button = {
  // border: "1px red solid",
  width: "100%",
  margin: "10px 0px "
};

const styles = theme => ({
  root: {
    // display: "flex",
    width: "100%"
  }
  //   formControl: {
  //     margin: theme.spacing.unit * 3
  //   },
  //   group: {
  //     margin: `${theme.spacing.unit}px 0`
  //   }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: "developer"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="gender"
            name="gender2"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="developer"
              control={<Radio color="primary" />}
              label="Developer"
              labelPlacement="start"
            />
            <FormControlLabel
              value="client"
              control={<Radio color="primary" />}
              label="Client"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <div style={{ width: "100%" }}>
          <Button
            style={update_button}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Update Account Settings
          </Button>
        </div>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
