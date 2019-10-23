import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Share from "../pages/Share";
import Profile from "../pages/Profile";
import Items from "../pages/Items";
import Menu from "../components/Menu";
import { ViewerContext } from "../context/ViewerProvider";
import PrivateRoute from "../components/PrivateRoute";

export default () => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => {
        if (!viewer) {
          return (
            <Switch>
              <Route path="/welcome" component={Home} />
              <Redirect from="*" to="/welcome" />
            </Switch>
          );
        }
        return (
          <Fragment>
            <Menu />
            <Switch>
              <Route exact path="/welcome" component={Home} />
              <PrivateRoute path="/share" component={Share} />
              <PrivateRoute path="/items" component={Items} />
              <PrivateRoute path="/profile/:userid" component={Profile} />
              <PrivateRoute path="/profile" component={Profile} />
              <Redirect from="*" to="/items" />
            </Switch>
          </Fragment>
        );
      }}
    </ViewerContext.Consumer>
  );
};
