import React from "react";
// import { Grid } from "@material-ui/core";

const ItemCard = ({ item }) => {
  console.log(item);
  return (
    <div>
      {item.title}
      {item.imageurl}
    </div>
  );
};

export default ItemCard;
