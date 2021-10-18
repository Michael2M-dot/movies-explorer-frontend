import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from './Loader/Loader';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {() => ( props.isAppLaunched
      ? <Loader />
      : props.isLoggedIn
        ? <Component {...props} />
        : <Redirect to={props.to} />
    )}
    {/* {() => ( props.isLoggedIn */}
    {/*  ? <Component {...props} /> */}
    {/*  : <Redirect to={props.to} /> */}
    {/* )} */}
  </Route>
);

export default ProtectedRoute;
