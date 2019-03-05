import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import Send from "@material-ui/icons/Send";

import blue from "@material-ui/core/colors/blue";
import axios from "axios";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

import { withSnackbar } from "notistack";

const emails = ["username@gmail.com", "user02@gmail.com"];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

class SearchResult extends React.Component {
  state = {
    checked: [],
    loading: false,
    success: false
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleSendinvite = (id, value) => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true
            });
          }, 2000);
        }
      );
      if (value.length === 0) {
        // this.props.enqueueSnackbar(
        //   "Send invites failed, no developers selected.",
        //   {
        //     variant: "error",
        //     action: (
        //       <Button style={{ color: "white" }} size="small">
        //         {"Close"}
        //       </Button>
        //     )
        //   }
        // );
      } else {
        // console.log(this.props.ownerid._id);
        axios
          .post("/user/updateproject", {
            devId: id,
            devName: value
          })
          .then(response => {
            // console.log("success");
            this.props.callProject();
            this.handleClose();
          })
          .catch(error => {
            console.log("error");
          });
      }
    }
  };

  handleToggle = (id, name) => () => {
    const { checked } = this.state;
    const currentIndex = checked.map(el => el.id).indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push({ id: id, name: name });
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const {
      classes,
      onClose,
      selectedValue,
      project = [],
      ...other
    } = this.props;
    // const { data } = this.state;
    // console.log(this.props.project, data);
    if (project) {
      return (
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          {...other}
        >
          <div>
            <List>
              {Object.keys(project.data).map((keyName, keyIndex) => {
                if (keyIndex < 5) {
                  return (
                    <ListItem
                      disabled={this.state.loading}
                      button
                      key={project.data[keyName].id}
                      onClick={this.handleToggle(project.data[keyName].id)}
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={project.data[keyName].name} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          color="primary"
                          onChange={this.handleToggle(
                            project.data[keyName].id,
                            project.data[keyName].name
                          )}
                          checked={
                            this.state.checked
                              .map(el => el.id)
                              .indexOf(project.data[keyName].id) !== -1
                          }
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
                return null;
              })}
              <ListItem
                button
                disabled={this.state.loading}
                onClick={() =>
                  this.handleSendinvite(
                    this.props.projectId,
                    this.state.checked
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <Send />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Send Invitation(s)" />
              </ListItem>
              {this.state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </List>
          </div>
        </Dialog>
      );
    }
    return null;
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func
};

const ResultPage = withSnackbar(withStyles(styles)(SearchResult));

class InviteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedValue: emails[1],
      projectList: null
    };
  }

  handleClickOpen = () => {
    // console.log(this.props.ownerID);
    const projectReq = this.props.projectReq;
    axios
      .post("/user/callDeveloper", {
        id: this.props.ownerID,
        projectReq
      })
      .then(response => {
        // console.log("Project response: ", response);
        this.setState({
          open: true,
          projectList: response.data
        });
      })
      .catch(error => {
        console.log("Invite Developer Error: ", error);
      });
  };

  handleClose = value => {
    // pass values back to parent when done
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Send Invite
        </Button>
        <ResultPage
          callProject={this.props.callProject}
          projectId={this.props.projectId}
          project={this.state.projectList}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(InviteButton);
