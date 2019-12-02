import { Query } from "react-apollo";
import React from "react";
import { VIEWER_QUERY } from "../apollo/queries";
import LoadingScreen from "../components/LoadingScreen";

const ViewerContext = React.createContext();

const ViewerProvider = ({ children }) => {
  return (
    <Query query={VIEWER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingScreen />;
        if (error) return `${error}`;

        const viewer = data && data.viewer ? data.viewer : null;
        return (
          <ViewerContext.Provider value={{ viewer }}>
            {children}
          </ViewerContext.Provider>
        );
      }}
    </Query>
  );
};

export { ViewerContext };
export default ViewerProvider;
