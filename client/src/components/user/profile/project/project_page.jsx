import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import AddProject from "./add_project";
import InviteProject from "./invite_project";
import CallProject from "./call_project";

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
      project: this.props.project
    };
    this.callProject = this.callProject.bind(this);
  }

  // componentDidMount() {
  //   this.props.callProject();
  // }

  // callProject() {
  //   console.log("Hitting call project on project page");
  // }

  callProject(info) {
    this.props.callProject(info);
  }

  render() {
    const {
      classes,
      addProject,
      inviteProject,
      callProject,
      location,
      userID
    } = this.props;
    // const { expanded } = this.state;
    // console.log(this.props);

    return (
      <div className={classes.root}>
        {addProject && <AddProject userID={userID} />}
        {inviteProject && <InviteProject />}
        {callProject && (
          <CallProject
            callProject={this.callProject}
            location={location}
            project={this.state.project}
            complete={this.props.complete}
          />
        )}
      </div>
    );
  }
}

MainProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainProject);
