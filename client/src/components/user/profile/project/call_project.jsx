import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import classNames from "classnames";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";

import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";

import moment from "moment";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngular,
  faCss3Alt,
  faHtml5,
  faJava,
  faJsSquare,
  faNodeJs,
  faPython,
  faReact
} from "@fortawesome/free-brands-svg-icons";
import {
  faSync,
  faFire,
  faEye,
  faHatWizard
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";

import Chip from "@material-ui/core/Chip";

import { withSnackbar } from "notistack";

import InviteDeveloper from "./invite_developer";

import Slide from "@material-ui/core/Slide";

const styles = theme => ({
  root: {
    width: "100%"
  },
  chip: {
    margin: "0px 2px",
    height: "35px",
    width: "37px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  row: {
    flexBasis: "100%"
  },
  halfrow: {
    // flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const skillShield = {
  angular: faAngular,
  css: faCss3Alt,
  html: faHtml5,
  java: faJava,
  javascript: faJsSquare,
  nodejs: faNodeJs,
  python: faPython,
  reactjs: faReact
};

let result = null;

function RenderMainClient(props) {
  return <div>Welcome Client</div>;
}

function RenderMainDeveloper(props) {
  return <div>Welcome Developer</div>;
}

function MainRender(props) {
  const role = props.role;
  if (role === "client") {
    return <RenderMainClient />;
  }
  return <RenderMainDeveloper />;
}

class CallProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleCallproject = () => {
    this.props.callProject();
    this.props.enqueueSnackbar("Project List Updated.", {
      variant: "success",
      action: (
        <Button style={{ color: "white" }} size="small">
          {"Close"}
        </Button>
      )
    });
  };

  handleCompleteproject = userID => {
    axios
      .post("/user/completeProject", {
        id: userID,
        projectState: "complete",
        projectFinish: new Date()
      })
      .then(response => {
        console.log("Project response: ", response);
        this.props.enqueueSnackbar("Project Completed.", {
          variant: "success"
        });
        this.handleCallproject();
      })
      .catch(error => {
        console.log("complete project page error: ", error);
      });
  };

  renderProjectAdvisory = () => {
    return <div>HELLO</div>;
  };

  render() {
    const { classes, project, complete, location, roleChoice } = this.props;
    const { expanded } = this.state;
    console.log(this.props);
    return (
      <div className={classes.root}>
        <MainRender role={roleChoice.role} />
      </div>
    );
  }
}

CallProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(CallProject));
