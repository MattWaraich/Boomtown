import React from "react";
import Grid from "@material-ui/core/Grid";
import ItemCard from "../../components/ItemCard";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const ItemsGrid = ({ items, classes }) => (
  <Grid className={classes.gridContainerStyle} container spacing={3}>
    {items.length ? (
      items.map(item => {
        return (
          <Grid key={item.id} item xs={12} sm={6} md={4}>
            <ItemCard item={item} />
          </Grid>
        );
      })
    ) : (
      <h2 className={classes.noItemsYet}>No items yet!</h2>
    )}
  </Grid>
);

export default withStyles(styles)(ItemsGrid);
