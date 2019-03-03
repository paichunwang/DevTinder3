import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Mainpage from "./components/landingpage/index";
import Loginpage from "./components/loginpage/index";
import Signpage from "./components/signpage/index";
import Started from "./components/gettingstarted/index";
import User from "./components/user/index";
import Test from "./components/user/profile/project/test";

import {
  MuiThemeProvider,
  withStyles,
  createMuiTheme
} from "@material-ui/core/styles";

import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { main: "#3498db" },
    secondary: { main: "#FFFFFF" },
    inherit: { main: "#3498db" },
    error: { 500: "#f44336" }
  }
});

const styles = {
  success: {
    backgroundColor: "#8dd258",
    "box-shadow":
      "0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)"
  }
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <SnackbarProvider
        maxSnack={3}
        classes={{
          variantSuccess: classes.success
        }}
      >
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Mainpage} />
                <Route exact path="/login" component={Loginpage} />
                <Route exact path="/signup" component={Signpage} />
                <Route exact path="/gettingstarted" component={Started} />
                <Route exact path="/user" component={User} />
                <Route exact path="/test" component={Test} />
              </Switch>
            </div>
          </Router>
        </MuiThemeProvider>
      </SnackbarProvider>
    );
  }
}

export default withStyles(styles)(App);
