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

import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
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

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    };
  }

  //CAN NOT USE DID MOUNT TO CALL INITAL HERE, THIS RUNS BEFORE PARENT DB USER CALL
  //   componentDidMount() {
  //     this.props.callProject("call_project mount initial call");
  //   }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, project } = this.props;
    const { expanded } = this.state;
    console.log(this.props.project);
    return (
      <div className={classes.root}>
        {Object.keys(project).map((keyName, keyIndex) => {
          return (
            <ExpansionPanel
              key={keyIndex}
              expanded={expanded === project[keyName].projectName}
              onChange={this.handleChange(project[keyName].projectName)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.column}>
                  <Typography className={classes.heading}>
                    {project[keyName].projectName}
                  </Typography>
                </div>
                <div className={classes.column}>
                  <Typography className={classes.secondaryHeading}>
                    Select trip destination
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.column} />
                <div className={classes.column}>
                  <Chip
                    label="Barbados"
                    className={classes.chip}
                    onDelete={() => {}}
                  />
                </div>
                <div className={classNames(classes.column, classes.helper)}>
                  <Typography variant="caption">
                    Select your destination of choice
                    <br />
                    <a href="#sub-labels-and-columns" className={classes.link}>
                      Learn more
                    </a>
                  </Typography>
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary">
                  Save
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
