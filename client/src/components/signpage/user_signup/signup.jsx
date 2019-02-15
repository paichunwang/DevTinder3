import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: { useNextVariants: true }
});

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class Signup extends Component {
  state = {
    fields: [
      {
        fname: "First Name",
        lname: "Last Name",
        email: "Email",
        password: "Password (6 or more character)"
      }
    ]
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <TextField
            className={classes.margin}
            label="MuiThemeProvider"
            id="mui-theme-provider-standard-input"
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
