import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Mainpage from "./components/mainPage/index";
import Information from "./components/profileview/Information";
import Profile from "./components/user/profile_system/index";
import Project from "./components/user/project_postAuth/index";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Mainpage} />
        <Route exact path="/gettingstarted" component={Information} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/testing/profile" component={Profile} />
        <Route exact path="/testing/project" component={Project} />
      </Switch>
    </div>
  </Router>
);

export default App;
