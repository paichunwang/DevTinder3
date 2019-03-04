import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import axios from "axios";

const emails = ["username@gmail.com", "user02@gmail.com"];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class SearchResult extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Developer Matches</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={email}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.handleListItemClick("addAccount")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

SearchResult.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const ResultPage = withStyles(styles)(SearchResult);

class InviteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedValue: emails[1]
    };
  }

  handleClickOpen = () => {
    // this.setState({
    //   open: true
    // });
    console.log(this.props);

    const { _id } = this.props.ownerID;
    const projectReq = this.props.projectReq;

    console.log(_id, projectReq);

    axios
      .post("/user/callDeveloper", {
        id: _id,
        projectReq
      })
      .then(response => {
        console.log("Project response: ", response);
        // this.props.enqueueSnackbar("Project Completed.", {
        //   variant: "success"
        // });
        // this.props.callProject();
      })
      .catch(error => {
        console.log("complete project page error: ", error);
      });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
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
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default InviteButton;
