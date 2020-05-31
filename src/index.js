import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import './index.css';
import NotFoundPage from './NotFoundPage';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { createBrowserHistory } from "history";

import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Users from './components/Users.js'
import User from './components/User.js'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    
      <Router history={history}>
        <div className='app'>
          <Header {...history} />
          <Switch>
            <Route exact path='/' render={()=><Users />} />
            <Route path='/user' render={({history})=><User {...history} />} />
            <Route path="/404" render={()=><NotFoundPage />} />
            <Redirect to="/404" />
          </Switch>
          <Footer />
        </div>
      </Router>
     
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

