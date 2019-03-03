import React from "react";
import Gettingstarted from "./main_landingpage/headermain";
import Navigation from "./nav_gettingstarted/navbar";

import Fade from "@material-ui/core/Fade";

const Mainpage = () => (
  <Fade in={true}>
    <div>
      <Gettingstarted />
      <Navigation />
    </div>
  </Fade>
);

export default Mainpage;
