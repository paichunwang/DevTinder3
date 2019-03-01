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
      // project: this.props.project
    };
    this.callProject = this.callProject.bind(this);
  }

  //this catch when user change page
  // componentDidMount() {
  //   console.log("hiting project page did mount");
  //   this.setState({ project: this.props.project }, () => {
  //     console.log(this.state);
  //   });
  // }

  // callProject() {
  //   console.log("Hitting call project on project page");
  // }

  callProject = () => {
    console.log("hitting project page");
    this.props.callProject();
  };

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
    // console.log("project page state: ", this.state);
    // console.log("project page props: ", this.props);

    return (
      <div className={classes.root}>
        {addProject && (
          <AddProject userID={userID} callProject={this.callProject} />
        )}
        {inviteProject && <InviteProject userID={userID} />}
        {callProject && (
          <CallProject
            userID={userID}
            callProject={this.callProject}
            location={location}
            project={this.props.project}
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
