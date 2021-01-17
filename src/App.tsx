import { ReactElement } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import DynamicRoute from './components/DynamicRoute';
import AuthProvider from './contexts/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = (): ReactElement => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <DynamicRoute
            exact
            path='/'
            component={Home}
            shouldAuthenticate
            redirectTo='/login'
          />
          <DynamicRoute path='/login' component={Login} redirectTo='/' />
          <DynamicRoute path='/signup' component={Signup} redirectTo='/' />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
