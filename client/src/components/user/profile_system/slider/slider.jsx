import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    padding: "20px 10px",
    width: "100%"
  },
  slider: {
    padding: "30px 0px",
    overflow: "hidden"
  }
};

class StepSlider extends React.Component {
  state = {
    value: 5
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label">Slider label</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          min={0}
          max={10}
          step={1}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StepSlider);
