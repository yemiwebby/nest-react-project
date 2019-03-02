import * as React from 'react';
import { Route } from 'react-router-dom';
import auth0Client from '../utils/auth';


interface IRouteProps {
  component: React.ComponentClass;
  path: string;
}

const PrivateRoute: React.SFC<IRouteProps> = ({
  component: Component, path
}) => {
  return (
    <Route path={path} render={(props) => {
      if (!auth0Client.isAuthenticated()) {
        auth0Client.login();
        return <div />;
      }
      return <Component {...props} />
    }} />
  )
}
export default PrivateRoute;
