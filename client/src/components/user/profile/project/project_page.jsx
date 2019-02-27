import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AddProject from "./add_project";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class MainProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  render() {
    const { classes, addProject, inviteProject, callProject } = this.props;
    // const { expanded } = this.state;

    return (
      <div className={classes.root}>
        {addProject && <AddProject userID={this.props.userID} />}
        {inviteProject && <div>Invite Project</div>}
        {callProject && <div>Call Project</div>}
      </div>
    );
  }
}

MainProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainProject);
