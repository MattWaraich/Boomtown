import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";
import Share from "../pages/Share";
import Profile from "../pages/Profile";
import Items from "../pages/Items";
import Menu from "../components/Menu";

export default () => {
  return (
    <Fragment>
      <Menu />
      <Switch>
        <Route path="/welcome" component={Home} />
        <Route path="/share" component={Share} />
        <Route path="/items" component={Items} />
        <Route path="/profile" component={Profile} />
        <Route path="/profile/:id" component={Profile} />
        <Redirect from="*" to="/items" />
      </Switch>
    </Fragment>
  );
};
