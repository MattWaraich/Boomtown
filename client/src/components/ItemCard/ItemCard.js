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
import { ViewerContext } from "../../context/ViewerProvider";
import PropTypes from "prop-types";

const ItemCard = ({ classes, item, props }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => {
        return (
          <Fragment>
            <Card>
              <CardActionArea>
                <CardMedia
                  className={classes.cardItemImages}
                  image={item.imageurl}
                />
              </CardActionArea>
              <CardContent>
                <div className={classes.gravatarDisplay}>
                  <Gravatar
                    email={item.itemowner ? item.itemowner.email : viewer.email}
                    className={classes.gravPic}
                  />
                  <div className={classes.gravatarName}>
                    <p>
                      {item.itemowner
                        ? item.itemowner.fullname
                        : viewer.fullname}
                    </p>
                    <p className={classes.momentColor}>
                      {moment(item.created).fromNow()}
                    </p>
                  </div>
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
      }}
    </ViewerContext.Consumer>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.array,
    imageurl: PropTypes.string,
    description: PropTypes.string,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    title: PropTypes.string.isRequired,
    itemowner: PropTypes.object
  }),

  viewer: PropTypes.shape({
    fullname: PropTypes.string.isRequired
  })
};

export default withStyles(styles)(ItemCard);
