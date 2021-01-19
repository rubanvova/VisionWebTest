import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import store from './store';
import { CLEAR_STORE } from './reducer';
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_ANY,
  ROUTES,
  KEY_TOKEN,
} from './constants';

const dispatchClearStore = () => store.dispatch({ type: CLEAR_STORE });

const checkAuth = () => {
  const token = localStorage.getItem(KEY_TOKEN);
  return !!token;
};

const RouteProtected = ({ pathKey, path, render, component, ...props }) => (
  <Route
    key={pathKey}
    path={path}
    render={(routeProps) => {
      const Component = component;
      const status = checkAuth();

      if (status) {
        return <Component {...routeProps} />;
      }
      dispatchClearStore();
      return <Redirect to={ROUTE_LOGIN} />;
    }}
    {...props}
  />
);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Route
          path={ROUTE_ANY}
          render={(props) => {
            const isAuth = checkAuth();
            const {
              location: { pathname },
            } = props;
            if (isAuth) {
              return pathname !== ROUTE_HOME ? (
                <Redirect to={ROUTE_HOME} />
              ) : null;
            }
            dispatchClearStore();
            if (!ROUTES.includes(pathname)) {
              return <Redirect to={ROUTE_LOGIN} />;
            }
            return null;
          }}
        />
        <RouteProtected exact path={ROUTE_HOME} component={Home} />
        <Route exact path={ROUTE_SIGNUP} component={SignUp} />
        <Route exact path={ROUTE_LOGIN} component={Login} />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
