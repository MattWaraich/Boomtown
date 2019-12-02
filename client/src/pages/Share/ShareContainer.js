import React, { Component } from "react";
import Share from "./Share";
import { Query } from "react-apollo";
import {} from "../../apollo/queries";
import { ALL_TAGS_QUERY } from "../../apollo/queries";
import LoadingScreen from "../../components/LoadingScreen";

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <LoadingScreen />;
          if (error) return `Error: ${error}`;
          if (data) {
            return <Share tags={data.tags} />;
          }
        }}
      </Query>
    );
  }
}

export default ShareContainer;
