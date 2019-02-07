import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Developerimage from "./developer.jpg";
import Customerimage from "./customer.jpg";
import "./developerMain.css";

const state = {
  developer: {
    key: "Hello",
    content: "Hello1",
    start: "Hello2"
  },
  customer: {
    key: "Hello",
    content: "Hello1",
    start: "Hello2"
  }
};

const styles = {
  card: {
    maxWidth: "100%"
  },
  media: {
    height: "60vh"
  }
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <div className="rowC">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={Developerimage}
            title="Developer"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {state.developer.key}
            </Typography>
            <Typography component="p">{state.developer.content}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href="/login" className="button">
            {state.developer.start}
          </a>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={Customerimage}
            title="Developer"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {state.customer.key}
            </Typography>
            <Typography component="p">{state.customer.content}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href="/login" className="button">
            {state.customer.start}
          </a>
        </CardActions>
      </Card>
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
