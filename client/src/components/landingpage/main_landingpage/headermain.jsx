import React, { Component } from "react";
import "./headermain.css";
import "./banner.jpg";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Gettingstarted from "../../gettingstarted/index";

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

class headermain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "headermain"
    };
  }

  handleChange = () => {
    this.setState({ location: "gettingstarted" });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.location === "headermain" && (
          <div>
            <section id="banner">
              <div className="inner">
                <header>
                  <h1>DevTinder</h1>
                  <p>
                    Platform to connect customers who need dev support on a
                    project
                    <br />
                    to developers who can work on their projects based on their
                    expertise
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleChange}
                  >
                    Let's Get Started!
                  </Button>
                </header>
              </div>
            </section>
          </div>
        )}
        {this.state.location === "gettingstarted" && <Gettingstarted />}
      </>
    );
  }
}

headermain.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(headermain);
