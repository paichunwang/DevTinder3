import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import ProfileAttribute from "./profile/profile";
import ProfileSlider from "./profile/skill_slider";
import ProfileChoice from "./profile/role_choice";

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
  }
});

class ProfileIndex extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        {/* <div> */}
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Account Settings" />
          <Tab label="Indicate Skills" />
          <Tab label="Select Role" />
        </Tabs>
        {/* </div> */}
        {value === 0 && (
          <TabContainer>
            <ProfileAttribute />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <ProfileSlider />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <ProfileChoice />
          </TabContainer>
        )}
      </Paper>
    );
  }
}

ProfileIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileIndex);

//   render() {
//     const { classes } = this.props;
//     return (
//       <div>
//         <form className={classes.container} noValidate autoComplete="off">
//           <div
//             style={{
//               borderRadius: "5px 5px 0px 0px",
//               width: "100%",
//               padding: "20px 0px",
//               textAlign: "center"
//             }}
//           >
//             HELLO
//           </div>
//           "Hello"
//         </form>
//       </div>
//     );
//   }
// }

// ProfileIndex.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ProfileIndex);
