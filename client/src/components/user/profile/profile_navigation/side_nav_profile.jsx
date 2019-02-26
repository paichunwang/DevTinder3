import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DirectionWalk from "@material-ui/icons/DirectionsWalk"; //Logout
import ArrowRight from "@material-ui/icons/ArrowRight"; //Location Seperator
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddCircle from "@material-ui/icons/AddCircle";
import Drafts from "@material-ui/icons/Drafts";
import FolderOpen from "@material-ui/icons/FolderOpen";
import Folder from "@material-ui/icons/Folder";

import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const Logoutbutton = {
  marginRight: "20px"
};

const ListRoutes = {
  "/user": "Profile Settings",
  "/user/add": "Add Projects",
  "/user/invite": "Open Invites",
  "/user/project": "Open Projects",
  "/user/complete": "Completed Projects",
  "/user/signout": "Sign Out"
};

const IconRoutes = {
  "/user": <AccountCircle />,
  "/user/add": <AddCircle />,
  "/user/invite": <Drafts />,
  "/user/project": <FolderOpen />,
  "/user/complete": <Folder />,
  "/user/signout": <DirectionWalk />
};

class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
      // navList: this.props.display.role
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, currentLocation, display } = this.props;
    const { open } = this.state;
    console.log("this.prop sidenav", this.props.display);

    const objectWithoutKey = (object, key) => {
      const { [key]: deletedKey, ...filterList } = object;
      return filterList;
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={true}>
            {/* OPTIONS ICON FOR OPENING DRAWER */}
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              style={{ flex: 1, textAlign: "left", paddingLeft: "15px" }}
              noWrap
            >
              {display.firstName + " " + display.lastName}
              <ArrowRight style={{ fontSize: "10pt" }} />{" "}
              {ListRoutes[currentLocation]}
            </Typography>
            <Button color="inherit" style={Logoutbutton}>
              <DirectionWalk />
              Sign out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          {display.role == null && <>PLEASE SELECT ROLE FIRST</>}
          {display.role === "client" && (
            <>
              {Object.keys(objectWithoutKey(ListRoutes, "/user/invite")).map(
                (keyName, keyIndex) => {
                  return (
                    <ListItem
                      button={true}
                      key={ListRoutes[keyName]}
                      value={keyName}
                      // component={NavLink}
                      // to={keyName}
                      onClick={() => this.props.action(keyName)}
                    >
                      <ListItemIcon>{IconRoutes[keyName]}</ListItemIcon>
                      <ListItemText primary={ListRoutes[keyName]} />
                    </ListItem>
                  );
                }
              )}
            </>
          )}
          {display.role === "developer" && (
            <>
              {Object.keys(objectWithoutKey(ListRoutes, "/user/add")).map(
                (keyName, keyIndex) => {
                  return (
                    <ListItem
                      button={true}
                      key={ListRoutes[keyName]}
                      value={keyName}
                      onClick={() => this.props.action(keyName)}
                    >
                      <ListItemIcon>{IconRoutes[keyName]}</ListItemIcon>
                      <ListItemText primary={ListRoutes[keyName]} />
                    </ListItem>
                  );
                }
              )}
            </>
          )}
        </Drawer>
        <main className={classNames(classes.content)}>
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

Sidenav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Sidenav);
