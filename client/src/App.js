import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Mainpage from "./components/landingpage/index";
import Loginpage from "./components/loginpage/index";
import Signpage from "./components/signpage/index";
import Started from "./components/gettingstarted/index";
import User from "./components/user/index";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { main: "#3498db" },
    secondary: { main: "#FFFFFF" },
    inherit: { main: "#3498db" },
    error: { 500: "#f44336" }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Mainpage} />
              <Route exact path="/login" component={Loginpage} />
              <Route exact path="/signup" component={Signpage} />
              <Route exact path="/gettingstarted" component={Started} />
              <Route exact path="/user" component={User} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
