import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const Share = ({ classes, tags }) => {
  return (
    <Grid container className={classes.sharePageGridContainer}>
      <Grid container className={classes.itemShareCardContainer}>
        <Grid item xs={6}>
          <ShareItemPreview />
        </Grid>
        <Grid className={classes.sharedItemPreview} item xs={6}>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);

Share.propTypes = {
  tags: PropTypes.array.isRequired
};
