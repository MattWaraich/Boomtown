import React from "react";
import ItemCard from "../ItemCard";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";

const shareItemPreview = item => {
  return (
    <ItemPreviewContext.Consumer>
      {({ state }) => {
        return <ItemCard item={state.item} />;
      }}
    </ItemPreviewContext.Consumer>
  );
};
export default shareItemPreview;

// dont return multiple children - caused an error on line 11 