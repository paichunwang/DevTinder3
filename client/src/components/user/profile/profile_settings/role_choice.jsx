import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { withSnackbar } from "notistack";

import Button from "@material-ui/core/Button";

import axios from "axios";

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
  constructor(props) {
    super(props);
    //console.log(this.props);
    this.state = {
      location: "roleChoice",
      role: this.props.display.role
    };
  }

  handleChange = event => {
    //console.log(event.target.value);
    this.setState({ role: event.target.value }, function() {
      //console.log(this.state);
    });
  };

  handleUpdate = event => {
    //console.log("hitting role_choice handleUpdate");
    event.preventDefault();
    axios
      .post("/update/user", {
        id: this.props.display._id,
        role: this.state.role
      })
      .then(response => {
        //console.log("role update response: ", response);
        if (response.status === 200) {
          this.props.onChildUpdate(this.state);
        }
        this.props.enqueueSnackbar("Role successfully updated.", {
          variant: "success"
        });
      })
      .catch(error => {
        //console.log("role update error: ", error);
      });
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
            value={this.state.role}
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
        <div style={{ width: "100%", padding: "0px 25px" }}>
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
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(RadioButtonsGroup));
