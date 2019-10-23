import React, { Fragment } from "react";
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

const ItemCard = ({ classes, item }) => {
  return (
    <Fragment>
      {console.log(item)}
      <Card>
        <CardActionArea>
          <CardMedia className={classes.cardItemImages} image={item.imageurl} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.tags
              .map(tag => {
                return tag.title;
              })
              .join(", ")}
          </Typography>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">BORROW</Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default withStyles(styles)(ItemCard);
