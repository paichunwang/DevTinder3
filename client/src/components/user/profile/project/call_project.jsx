// import React, { Component } from "react";

// export default class call_project extends Component {
//   render() {
//     return <div>CALL PROJECT {this.props.location}</div>;
//   }
// }

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
import { faSync } from "@fortawesome/free-solid-svg-icons";
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

class ControlledExpansionPanels extends React.Component {
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
        this.props.callProject();
      })
      .catch(error => {
        console.log("complete project page error: ", error);
      });
  };

  renderProjectAdvisory = () => {
    return <div>HELLO</div>;
  };

  render() {
    const { classes, project, complete, location } = this.props;
    const { expanded } = this.state;
    console.log(this.props);
    return (
      <>
        {project !== undefined && (
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
              {/* THIS IS OPEN PROJECT PAGE */}
              {!complete && (
                <>
                  {Object.keys(project).map((keyName, keyIndex) => {
                    if (!project[keyIndex].projectState) {
                      return (
                        <ExpansionPanel
                          key={keyIndex}
                          expanded={expanded === project[keyName]._id}
                          onChange={this.handleChange(project[keyName]._id)}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>
                                Project Name: <br />
                              </Typography>
                              <Typography className={classes.heading}>
                                {project[keyName].projectName}
                              </Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>
                                Project ID:
                              </Typography>
                              <Typography className={classes.heading}>
                                {project[keyName]._id}
                              </Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>
                                Project Created On:
                              </Typography>
                              <Typography className={classes.heading}>
                                {moment(project[keyName].projectInit).format(
                                  "MMM Do YY, h:mm a"
                                )}
                              </Typography>
                            </div>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails
                            style={{
                              height: "80px",
                              backgroundColor: "#fafafa"
                            }}
                            className={classes.details}
                          >
                            <div
                              style={{ height: "100%" }}
                              className={classes.column}
                            >
                              {this.props.roleChoice.role === "client" && (
                                <Typography variant="caption">
                                  {this.props.project.developer == null && (
                                    <>
                                      <Typography
                                        className={classes.secondaryHeading}
                                      >
                                        Invite a Developer
                                      </Typography>
                                      <InviteDeveloper />
                                    </>
                                  )}
                                  {this.props.project.developer && (
                                    <InviteDeveloper />
                                  )}
                                </Typography>
                              )}
                              {this.props.roleChoice.role === "developer" && (
                                <>
                                  <Typography
                                    className={classes.secondaryHeading}
                                  >
                                    Project Accepted on:
                                  </Typography>
                                  <Typography className={classes.heading}>
                                    {project[keyName].projectDeveloper.map(
                                      (entry, index) => {
                                        if (entry.devAccept == null) {
                                          return null;
                                        } else if (
                                          entry.devID ===
                                          this.props.roleChoice._id
                                        ) {
                                          return moment(entry.devAccept).format(
                                            "MMM Do YY"
                                          );
                                        } else {
                                          return null;
                                        }
                                      }
                                    )}
                                  </Typography>
                                </>
                              )}
                            </div>
                            <div
                              style={{ height: "100%" }}
                              className={classes.column}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Project Budget:
                              </Typography>
                              <Typography className={classes.heading}>
                                ${project[keyName].projectBudget}
                              </Typography>
                            </div>
                            <div
                              style={{
                                height: "100%",
                                paddingRight: "36px"
                              }}
                              className={classNames(classes.column)}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Project Due:
                              </Typography>
                              <Typography className={classes.heading}>
                                {moment(project[keyName].projectDue).format(
                                  "MMM Do YY"
                                )}
                              </Typography>
                            </div>
                          </ExpansionPanelDetails>
                          <ExpansionPanelDetails
                            style={{ backgroundColor: "#fafafa" }}
                          >
                            <div
                              style={{ width: "100%" }}
                              className={classes.halfrow}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Developer Invited:
                              </Typography>
                              <div>
                                {project[keyIndex].projectInvite &&
                                  project[keyIndex].projectInvite.map(entry => {
                                    return (
                                      <Tooltip
                                        key={entry.devID}
                                        title={entry.devName}
                                      >
                                        <Chip
                                          label={entry.devName.charAt(0)}
                                          className={classes.chip}
                                        />
                                      </Tooltip>
                                    );
                                  })}
                              </div>
                            </div>
                            <div
                              style={{ width: "100%" }}
                              className={classes.halfrow}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Accepted Developer:
                              </Typography>
                              <div>
                                {project[keyIndex].projectDeveloper &&
                                  project[keyIndex].projectDeveloper.map(
                                    entry => {
                                      return (
                                        <Tooltip
                                          key={entry.devID}
                                          title={entry.devName}
                                        >
                                          <Chip
                                            label={entry.devName.charAt(0)}
                                            className={classes.chip}
                                            color="primary"
                                          />
                                        </Tooltip>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          </ExpansionPanelDetails>
                          <ExpansionPanelDetails>
                            <div
                              style={{ width: "100%" }}
                              className={classes.row}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Project Skill Requirement
                              </Typography>
                              {Object.keys(
                                project[keyName].projectSkillReq
                              ).map((subkeyName, subkeyIndex) => {
                                return (
                                  <Tooltip
                                    style={{
                                      margin: "0px 10px"
                                    }}
                                    key={subkeyIndex}
                                    title={project[keyName].projectSkillReq[
                                      subkeyIndex
                                    ].toUpperCase()}
                                    aria-label={
                                      project[keyName].projectSkillReq[
                                        subkeyIndex
                                      ]
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={
                                        skillShield[
                                          project[keyName].projectSkillReq[
                                            subkeyName
                                          ]
                                        ]
                                      }
                                      size="3x"
                                      color="lightgray"
                                    />
                                  </Tooltip>
                                );
                              })}
                            </div>
                          </ExpansionPanelDetails>
                          <Divider />

                          {this.props.roleChoice.role === "client" && (
                            <ExpansionPanelActions
                              style={{ justifyContent: "space-between" }}
                            >
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => {
                                  this.handleCompleteproject(
                                    project[keyName]._id
                                  );
                                }}
                              >
                                Project Complete
                              </Button>
                              <Button
                                size="small"
                                color="primary"
                                onClick={this.handleChange(
                                  project[keyName]._id
                                )}
                              >
                                Close Project Tab
                              </Button>
                            </ExpansionPanelActions>
                          )}
                          {this.props.roleChoice.role === "developer" && (
                            <ExpansionPanelActions
                              style={{ justifyContent: "flex-end" }}
                            >
                              <Button
                                size="small"
                                color="primary"
                                onClick={this.handleChange(
                                  project[keyName]._id
                                )}
                              >
                                Close Project Tab
                              </Button>
                            </ExpansionPanelActions>
                          )}
                        </ExpansionPanel>
                      );
                    } else {
                      return null;
                    }
                  })}
                </>
              )}
              {/* THIS IS COMPLETE PROJECT PAGE */}
              {complete && (
                <>
                  {Object.keys(project).map((keyName, keyIndex) => {
                    if (project[keyIndex].projectState) {
                      return (
                        <ExpansionPanel
                          key={keyIndex}
                          expanded={expanded === project[keyName]._id}
                          onChange={this.handleChange(project[keyName]._id)}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>
                                Project Name: <br />
                              </Typography>
                              <Typography className={classes.heading}>
                                {project[keyName].projectName}
                              </Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>
                                Project ID:
                              </Typography>
                              <Typography className={classes.heading}>
                                {project[keyName]._id}
                              </Typography>
                            </div>
                            <div className={classes.column}>
                              <Typography className={classes.secondaryHeading}>
                                Project Created On:
                              </Typography>
                              <Typography className={classes.heading}>
                                {moment(project[keyName].projectInit).format(
                                  "MMM Do YY, h:mm a"
                                )}
                              </Typography>
                            </div>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails
                            style={{
                              height: "80px",
                              backgroundColor: "#fafafa"
                            }}
                            className={classes.details}
                          >
                            <div
                              style={{ height: "100%" }}
                              className={classes.column}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Developers:
                              </Typography>
                              <div>
                                {project[keyIndex].projectInvite &&
                                  project[keyIndex].projectInvite.map(entry => {
                                    return (
                                      <Tooltip
                                        key={entry.devID}
                                        title={entry.devName}
                                      >
                                        <Chip
                                          label={entry.devName.charAt(0)}
                                          className={classes.chip}
                                          color="primary"
                                        />
                                      </Tooltip>
                                    );
                                  })}
                              </div>
                            </div>
                            <div
                              style={{ height: "100%" }}
                              className={classes.column}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Project Budget:
                              </Typography>
                              <Typography className={classes.heading}>
                                ${project[keyName].projectBudget}
                              </Typography>
                            </div>
                            <div
                              style={{
                                height: "100%",
                                paddingRight: "36px"
                              }}
                              className={classNames(classes.column)}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Project Due Date
                              </Typography>
                              <Typography className={classes.heading}>
                                {moment(project[keyName].projectDue).format(
                                  "MMM Do YY"
                                )}
                              </Typography>
                              <Typography className={classes.secondaryHeading}>
                                Project Completion Date
                              </Typography>
                              <Typography className={classes.heading}>
                                {moment(project[keyName].projectFinish).format(
                                  "MMM Do YY"
                                )}
                              </Typography>
                            </div>
                          </ExpansionPanelDetails>

                          <ExpansionPanelDetails>
                            <div
                              style={{ width: "100%" }}
                              className={classes.row}
                            >
                              <Typography className={classes.secondaryHeading}>
                                Project Skill Requirement
                              </Typography>
                              {Object.keys(
                                project[keyName].projectSkillReq
                              ).map((subkeyName, subkeyIndex) => {
                                return (
                                  <Tooltip
                                    style={{
                                      margin: "0px 10px"
                                    }}
                                    key={subkeyIndex}
                                    title={project[keyName].projectSkillReq[
                                      subkeyIndex
                                    ].toUpperCase()}
                                    aria-label={
                                      project[keyName].projectSkillReq[
                                        subkeyIndex
                                      ]
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={
                                        skillShield[
                                          project[keyName].projectSkillReq[
                                            subkeyName
                                          ]
                                        ]
                                      }
                                      size="3x"
                                      color="lightgray"
                                    />
                                  </Tooltip>
                                );
                              })}
                            </div>
                          </ExpansionPanelDetails>
                          <Divider />
                          <ExpansionPanelActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={this.handleChange(project[keyName]._id)}
                            >
                              Close Project Tab
                            </Button>
                          </ExpansionPanelActions>
                        </ExpansionPanel>
                      );
                    } else {
                      return null;
                    }
                  })}
                </>
              )}
              {project.length >= 1 && (
                <Tooltip
                  style={{
                    margin: "0px 10px"
                  }}
                  key="refresh"
                  title="Refresh Project List"
                >
                  <Fab
                    style={{ backgroundColor: "#8dd258", marginTop: "20px" }}
                    variant="extended"
                    // fullWidth
                    size="large"
                    color="primary"
                    onClick={this.handleCallproject}
                  >
                    <FontAwesomeIcon
                      icon={faSync}
                      size="1x"
                      color="white"
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Refresh Project List
                  </Fab>
                </Tooltip>
              )}
            </div>
          </Slide>
        )}
        {project !== undefined && location !== undefined && (
          <>
            {project.length === 0 && (
              <div>NO PROJECT YET, ADD A PROJECT, OR WAIT FOR INVITE</div>
            )}
          </>
        )}
      </>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(ControlledExpansionPanels));
