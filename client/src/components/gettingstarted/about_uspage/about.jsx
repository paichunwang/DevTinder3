import React from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { createMuiTheme } from "@material-ui/core/styles";

import developerImage from "./developed_patrick.jpg";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { 500: "#3498db" },
    secondary: { A400: "#3498db" },
    error: { 500: "#f44336" }
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: "50px 20px" }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "50px 0px 0px"
  },
  Paper: {
    width: "50%"
  },
  Tab: { padding: "20px" }
});

const aboutUs_section_style = {
  width: "80%",
  display: "block",
  //   border: "2px red solid",
  overflow: "auto"
  //   float: "right"
};

const aboutUs_text_style = {
  margin: "20px 20px 20px 0px"
};

class CenteredTabs extends React.Component {
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
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Paper className={classes.Paper}>
            <Tabs
              className={classes.Tab}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="About" />
              <Tab label="Developer" />
              <Tab label="Client" />
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <div className="aboutus_section" style={aboutUs_section_style}>
                  <img
                    alt="developerpicture"
                    src={developerImage}
                    style={{
                      maxWidth: "250px",
                      maxHeight: "250px",
                      width: "50%",
                      float: "left",
                      marginRight: "20px"
                    }}
                  />
                  <p style={aboutUs_text_style}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla et dictum interdum, nisi lorem
                    egestas odio, vitae scelerisque enim ligula venenatis dolor.
                    Maecenas nisl est, ultrices nec congue eget, auctor vitae
                    massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante
                    ligula, facilisis sed ornare eu, lobortis in odio. Praesent
                    convallis urna a lacus interdum ut hendrerit risus congue.
                    Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
                    ac...
                  </p>
                </div>
              </TabContainer>
            )}
            {value === 1 && <TabContainer>Item Two</TabContainer>}
            {value === 2 && <TabContainer>Item Three</TabContainer>}
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CenteredTabs);