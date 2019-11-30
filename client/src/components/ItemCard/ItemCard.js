import React, { Fragment } from "react";
import * as moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import Gravatar from "react-gravatar";

const ItemCard = ({ classes, item, props }) => {
  return (
    <Fragment>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.cardItemImages} image={item.imageurl} />
        </CardActionArea>
        <CardContent>
          <div className={classes.gravatarDisplay}>
            <Gravatar email="MarkZ@gmail.com" />
            <div className={classes.gravatarName}>
              <p>JEFF</p>
            </div>
            <p>{moment(item.created).fromNow()}</p>
          </div>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.tags
              ? item.tags
                  .map(tag => {
                    return tag.title;
                  })
                  .join(", ")
              : "no tags found"}
          </Typography>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.itemBorrowButton}
            type="submit"
            variant="contained"
          >
            BORROW
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default withStyles(styles)(ItemCard);
