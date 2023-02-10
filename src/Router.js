import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';

import * as PagesUrl from './configs/PagesUrl';
import ScreensUserLogin from './screens/User/Login';
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import GroupRestrictedRoute from "./RestrictedRouter";

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route {...rest} render={(props) => {
        return (
            isLoggedIn === true
                ? (
                    <div>
                        <Header/>
                        <Sidebar/>
                        <Component {...props}/>
                        <Footer/>
                    </div>
                )
                : <Redirect to={PagesUrl.PAGE_LOGIN}/>
        )
    }}/>
);

const PublicRoutes = ({history, isLoggedIn}) => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path={PagesUrl.PAGE_ROOT} component={ScreensUserLogin}/>
            <Route exact path={PagesUrl.PAGE_LOGIN} component={ScreensUserLogin}/>
            <RestrictedRoute isLoggedIn={isLoggedIn} component={GroupRestrictedRoute} history={history}/>
        </Switch>
    </ConnectedRouter>
);

export default connect(state => ({
    isLoggedIn: state.authReducer.isLoggedIn
}))(PublicRoutes);
