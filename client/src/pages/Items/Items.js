import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ItemsGrid from "../../components/ItemsGrid";
import PropTypes from "prop-types";

const Items = ({ items, classes }) => {
  return (
    <div className={classes.itemsPage}>
      <ItemsGrid items={items} />
    </div>
  );
};

export default withStyles(styles)(Items);

Items.propTypes = {
  items: PropTypes.array
};
