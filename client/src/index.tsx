import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { IAppState } from './Store/Store';
import configureStore from './Store/Store';
import { Store } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Auth0Provider } from "./react-auth0-wrapper"; 

interface IProps {
  store: Store<IAppState>;
}

const onRedirectCallback = appState => {
  // Temporary Firefox workaround
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const Root: React.SFC<IProps> = props => {
  return (
  <Provider store={props.store}>
    <BrowserRouter>
        <Auth0Provider
        domain="dev-uo20nmyd.auth0.com"
        client_id= "UGRjhP8KLjQOYGdDSC41YZRJjIZePwMB"
        leeway="120"
        audience="https://atlantico.com.br/intranet/api"
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}>
            <App />
        </Auth0Provider>
    </BrowserRouter>
  </Provider>

  );
};

const store = configureStore();

ReactDOM.render(<Root store={store}/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
