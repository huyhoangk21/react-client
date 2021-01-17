import { ComponentType, ReactElement, useContext } from 'react';
import {
  RouteProps,
  Route,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom';
import { AuthStateContext } from '../contexts/AuthProvider';

interface DynamicRouteProps extends RouteProps {
  component: ComponentType<RouteComponentProps<any>>;
  shouldAuthenticate?: boolean;
  redirectTo: string;
}

const DynamicRoute = ({
  component: Component,
  shouldAuthenticate,
  redirectTo,
  ...otherRouteProps
}: DynamicRouteProps): ReactElement => {
  const { authenticated } = useContext(AuthStateContext);

  return (
    <Route
      {...otherRouteProps}
      render={props => {
        if (
          (shouldAuthenticate && authenticated) ||
          (!shouldAuthenticate && !authenticated)
        ) {
          return <Component {...props} />;
        } else {
          return <Redirect to={redirectTo} />;
        }
      }}
    />
  );
};

export default DynamicRoute;
