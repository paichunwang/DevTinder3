import React from "react";
import Aboutus from "./about_uspage/about";
import Fade from "@material-ui/core/Fade";

const Gettingstarted = () => (
  <Fade in={true}>
    <div>
      <Aboutus />
    </div>
  </Fade>
);

export default Gettingstarted;
