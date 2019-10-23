import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import ViewerProvider from "./context/ViewerProvider";
import ItemPreviewProvider from "./context/ItemPreviewProvider";
import client from "./apollo";

import registerServiceWorker from "./registerServiceWorker";
import theme from "./theme";

import "./index.css";
import { ApolloProvider } from "react-apollo";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ItemPreviewProvider>
          <ViewerProvider>
            <Router>
              <Routes />
            </Router>
          </ViewerProvider>
        </ItemPreviewProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
