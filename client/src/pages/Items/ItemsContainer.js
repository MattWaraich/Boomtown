// Stateful components

import React, { Component } from "react";
import Items from "./Items";

import { Query } from "react-apollo";
import { ALL_ITEMS_QUERY } from "../../apollo/queries";

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: 8 }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading";
          if (error) return `Error: ${error}`;
          if (data) {
            return <Items items={data.items} />;
          }
        }}
      </Query>
    );
  }
}

export default ItemsContainer;