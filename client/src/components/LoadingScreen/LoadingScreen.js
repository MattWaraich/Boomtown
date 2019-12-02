import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.loadingScreenContainer}>
      <CircularProgress className={classes.screenLoader} />
      <p>“For it is in giving that we receive.”</p>
    </div>
  );
};

export default withStyles(styles)(FullScreenLoader);
