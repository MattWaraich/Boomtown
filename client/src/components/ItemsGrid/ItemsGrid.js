import React from "react";
import Grid from "@material-ui/core/Grid";
import ItemCard from "../../components/ItemCard";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const ItemsGrid = ({ classes, items }) => (
  <Grid className={classes.gridContainerStyle} container spacing={3}>
    {items.map(item => {
      return (
        <Grid key={item.id} item xs={12} sm={6} md={4}>
          <ItemCard item={item} />
        </Grid>
      );
    })}
  </Grid>
);

export default withStyles(styles)(ItemsGrid);
