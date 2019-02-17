import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./profile.css";
import Slider from "../slider/slider";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    "background-color": "#eeeeee",
    "margin-left": "calc(120px + 15%) ",
    "margin-right": "15%",
    "margin-top": "20px",
    // padding: "20px",
    "border-radius": "3px"
    // height: "80vh"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

class OutlinedTextFields extends React.Component {
  state = {
    pageName: "Profile Settings"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <div className="pageTitleprofile">{this.state.pageName}</div>
          <TextField
            id="outlined-full-width"
            label="Profile Picture Link"
            style={{ margin: 8 }}
            placeholder="https://google.com/profileimage.jpg"
            helperText="https:// only and picture must be 320 x 320 px sized"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="outlined-full-width"
            label="First Name"
            style={{ margin: 8 }}
            placeholder="John"
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="outlined-full-width"
            label="Last Name"
            style={{ margin: 8 }}
            placeholder="Smith"
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="outlined-full-width"
            label="Github Link"
            style={{ margin: 8 }}
            placeholder="https://github.com/Sameple/ProjectLink"
            helperText="https:// only"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="outlined-full-width"
            label="Protfolio Link"
            style={{ margin: 8 }}
            placeholder="John"
            helperText="https:// only"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Slider />
        </form>
      </div>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedTextFields);
