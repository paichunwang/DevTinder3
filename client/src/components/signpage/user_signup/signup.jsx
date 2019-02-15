import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const theme = createMuiTheme({
  palette: {
    primary: { 500: "#3498db" },
    error: { 500: "#FFFFFF" }
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

const Values = {
  fname: "First Name",
  lname: "Last Name",
  email: "Email",
  password: "Password (6 or more character)"
};

const columnStyle = {
  width: "30%"
  // background-color: #ffffff60;
  // margin-top: 20vh;
  // padding: 50px;
  // border-radius: 15px;
};

class Signup extends Component {
  render() {
    return (
      <div className="column" style={columnStyle}>
        <div>
          <MuiThemeProvider theme={theme}>
            {Object.keys(Values).map((keyName, keyIndex) => {
              return (
                <div>
                  <TextField
                    className={keyName}
                    label={Values[keyName]}
                    id="mui-theme-provider-standard-input"
                    fullWidth="true"
                  />
                </div>
              );
            })}
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
