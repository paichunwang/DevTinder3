import React from "react";
import "./headermain.css";
import "./banner.jpg";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    "background-color": "#3498db",
    width: "50%",
    "min-width": "250px",
    "&:hover": {
      backgroundColor: "#4aa3df"
    }
  },
  input: {
    display: "none"
  }
});

function ContainedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <section id="banner">
        <div className="inner">
          <header>
            <h1>DevTinder</h1>
            <p>
              Platform to connect customers who need dev support on a project
              <br />
              to developers who can work on their projects based on their
              expertise
            </p>
            <Button
              href="/gettingstarted"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Get Started
            </Button>
          </header>
        </div>
      </section>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
