import React, { Component } from "react";
import Profile from "./Profile";
import { Query } from "react-apollo";
import { ALL_USER_ITEMS_QUERY } from "../../apollo/queries";
import { ViewerContext } from "../../context/ViewerProvider";
import LoadingScreen from "../../components/LoadingScreen";
import { withRouter } from "react-router";

class ProfileContainer extends Component {
  render() {
    const { match } = this.props;
    console.log(match);
    return (
      <ViewerContext.Consumer>
        {({ viewer }) => {
          return (
            <Query
              query={ALL_USER_ITEMS_QUERY}
              fetchPolicy="cache-and-network"
              variables={{
                id:
                  match.path === "/profile/:userid"
                    ? match.params.userid
                    : viewer.id
              }}
            >
              {({ loading, error, data }) => {
                if (loading) return <LoadingScreen />;
                if (error) return `Error: ${error}`;
                if (data) return <Profile info={data.user} />;
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default withRouter(ProfileContainer);
