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

  handleSendinvite = value => {
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
        this.props.enqueueSnackbar(
          "Send Invites failed, no developers selected.",
          {
            variant: "error"
          }
        );
      } else if (!value.length === 0) {
        console.log("Appending to db and call prop close");
      } else {
        console.log("failed");
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
                onClick={() => this.handleSendinvite(this.state.checked)}
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
    const { _id } = this.props.ownerID;
    const projectReq = this.props.projectReq;
    axios
      .post("/user/callDeveloper", {
        id: _id,
        projectReq
      })
      .then(response => {
        console.log("Project response: ", response);
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
          ownerid={this.props.ownerID}
          project={this.state.projectList}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(InviteButton);
