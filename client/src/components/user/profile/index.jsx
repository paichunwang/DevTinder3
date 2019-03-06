import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ProfileSettings from "./profile_settings/account_settings";
import ProfileSlider from "./profile_settings/skill_slider";
import ProfileChoice from "./profile_settings/role_choice";

import Slide from "@material-ui/core/Slide";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 30 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = () => ({
  root: {
    flexGrow: 1
  },
  "MuiTab-labelContainer-182": {
    border: "1px red solid"
  }
});

class ProfileIndex extends React.Component {
  state = {
    value: 0
    // user: this.props.userInfo
  };

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChildUpdate = values => {
    this.props.onChildUpdate(values);
    this.props.roleChange();
  };

  render() {
    //console.log("index render for account setting", this.props);
    const { classes, userInfo, skillSlider, roleChoice } = this.props;
    const { value } = this.state;

    return (
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Account Settings" />
            {roleChoice.role === "client" && (
              <Tab
                style={{ backgroundColor: "#f2f2f2", maxWidth: "160px" }}
                label={
                  <>
                    <Typography
                      style={{
                        fontSize: "7px",
                        // border: "1px red solid",
                        margin: "0px"
                      }}
                    >
                      Disabled on Client Role
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{ color: "rgba(0, 0, 0, 0.54)" }}
                    >
                      Indicated Skills
                    </Typography>
                  </>
                }
                disabled
              />
            )}
            {roleChoice.role === "developer" && <Tab label="Indicate Skills" />}
            {roleChoice.role === undefined && (
              <Tab
                style={{ backgroundColor: "#f2f2f2", maxWidth: "160px" }}
                label={
                  <>
                    <Typography
                      style={{
                        fontSize: "7px",
                        // border: "1px red solid",
                        margin: "0px"
                      }}
                    >
                      Select Role First
                    </Typography>
                    <Typography variant="caption" style={{ color: "red" }}>
                      Indicated Skills
                    </Typography>
                  </>
                }
                disabled
              />
            )}
            <Tab label="Select Role" />
          </Tabs>
          {value === 0 && (
            <TabContainer>
              <ProfileSettings
                display={userInfo}
                onChildUpdate={this.handleChildUpdate}
              />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <ProfileSlider
                display={skillSlider}
                onChildUpdate={this.handleChildUpdate}
              />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <ProfileChoice
                display={roleChoice}
                onChildUpdate={this.handleChildUpdate}
              />
            </TabContainer>
          )}
        </Paper>
      </Slide>
    );
  }
}

ProfileIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileIndex);
