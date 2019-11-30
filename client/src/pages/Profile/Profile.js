import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Gravatar from "react-gravatar";
import ItemsGrid from "../../components/ItemsGrid/ItemsGrid";

const Profile = ({ info, classes }) => {
  return (
    <div className={classes.wholePage}>
      <div className={classes.profileContainer}>
        <div className={classes.itemsSharedContainer}>
          <div className={classes.usersBanner}>
            <div className={classes.userGravatar}>
              <Gravatar email={info.email} />
            </div>

            <div className={classes.userFullname}>{info.fullname}</div>
          </div>

          <div className={classes.userData}></div>
          <div className={classes.bold}>
            {info.items.length} Items shared_
            <div className={classes.bold}>
              {info.borrowed.length} Items borrowed
            </div>
          </div>

          <div className={classes.usersBio}>
            {info.bio ? info.bio : "Just a happy guy"}
          </div>
        </div>
        <h1 className={classes.sharedItemsTitle}>Shared Items</h1>
        <ItemsGrid items={info.items} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Profile);
