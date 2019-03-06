import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LoginIcon from "@material-ui/icons/Input";
import RegsIcon from "@material-ui/icons/HowToReg";
import Healing from "@material-ui/icons/Healing";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="absolute" style={{ backgroundColor: "#00000033" }}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="primary"
              aria-label="Menu"
              disabled={true}
              style={{ color: "#3498db", marginRight: "0px" }}
            >
              <Healing />
              DevTinder
            </IconButton>
            <Typography
              style={{ textAlign: "left" }}
              color="secondary"
              className={classes.grow}
            >
              Designed and Created by Patrick Wang
            </Typography>
            <Button
              // component={Link}
              // to="/login"
              // href="/login"
              // state="hello"
              onClick={() => {
                this.props.login("login");
              }}
              color="secondary"
              className={classes.button}
            >
              Login
              <LoginIcon className={classes.rightIcon} />
            </Button>
            <Button
              // component={Link}
              // to="/login"
              // href="/signup"
              onClick={() => {
                this.props.login("signup");
              }}
              color="secondary"
              className={classes.button}
            >
              Signup
              <RegsIcon className={classes.rightIcon} />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="Menu"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit" className={classes.grow}>
//             DevTinder
//           </Typography>
//           <Button
//             onClick={this.routeChange}
//             color="inherit"
//             className={classes.button}
//           >
//             Login
//             <LoginIcon className={classes.rightIcon} />
//           </Button>
//           <Button color="inherit" className={classes.button}>
//             Signup
//             <RegsIcon className={classes.rightIcon} />
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
