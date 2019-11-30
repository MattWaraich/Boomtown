import React from "react";
import ItemCard from "../ItemCard";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import styles from "./styles";
import { withStyles } from "@material-ui/core";

const shareItemPreview = ({ classes }) => {
  return (
    <ItemPreviewContext.Consumer>
      {({ state }) => {
        return <ItemCard item={state.item} />;
      }}
    </ItemPreviewContext.Consumer>
  );
};
export default withStyles(styles)(shareItemPreview);
