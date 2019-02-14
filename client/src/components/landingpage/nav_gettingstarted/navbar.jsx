import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LoginIcon from "@material-ui/icons/Input";
import RegsIcon from "@material-ui/icons/HowToReg";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 0.5)"
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
});

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
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="absolute" color="primary">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="secondary"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="secondary"
                className={classes.grow}
              >
                DevTinder
              </Typography>
              <Button
                // component={Link}
                // to="/login"
                href="/login"
                state="hello"
                color="secondary"
                className={classes.button}
              >
                Login
                <LoginIcon className={classes.rightIcon} />
              </Button>
              <Button
                // component={Link}
                // to="/login"
                href="/signup"
                onClick={this.handleSignup}
                color="secondary"
                className={classes.button}
              >
                Signup
                <RegsIcon className={classes.rightIcon} />
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
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
