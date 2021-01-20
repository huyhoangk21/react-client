import { ReactElement } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import DynamicRoute from './components/functional/DynamicRoute';
import AuthProvider from './contexts/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const App = (): ReactElement => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <DynamicRoute path='/login' component={Login} redirectTo='/' />
          <DynamicRoute path='/signup' component={Signup} redirectTo='/' />
          <DynamicRoute
            path='/:username'
            component={Profile}
            shouldAuthenticate
            redirectTo='/login'
          />
          <DynamicRoute
            exact
            path='/'
            component={Home}
            shouldAuthenticate
            redirectTo='/login'
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
