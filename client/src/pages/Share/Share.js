import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ShareItemForm from "../../components/ShareItemForm";
import ShareItemPreview from "../../components/ShareItemPreview";
import Grid from "@material-ui/core/Grid";

const mockItem = {
  title: "1",
  imageurl: "1",
  description: "1",
  tags: [{ id: 1, title: "1" }, { id: 2, title: "3" }]
};

const Share = ({ classes }) => {
  return (
    <Grid container className={classes.sharePageGridContainer}>
      <Grid item xs={6}>
        <ShareItemPreview item={mockItem} />
      </Grid>
      <Grid className={classes.sharedItemPreview} item xs={6}>
        <ShareItemForm />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
