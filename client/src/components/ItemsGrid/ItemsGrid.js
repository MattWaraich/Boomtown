import React from "react";
// import { Grid } from "@material-ui/core";
import ItemCard from "../ItemCard";

const ItemsGrid = ({ items }) => (
  <div>
    {items.map(item => {
      return <ItemCard key={item.id} item={item} />;
    })}
  </div>
);

export default ItemsGrid;
