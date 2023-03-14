import { useState, useEffect } from 'react';
import './app.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';

import { ROUTES } from '../../resources/Routes';
import Orders from '../Orders/Orders';
import Cheque from '../Cheque/Cheque';
import Customers from '../Customers/Customers';

function App() {
  
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path={ROUTES.orders}>
            <div className='app__section'>
              <Orders />
            </div>
          </Route>
          <Route exact path={ROUTES.customer}>
            <div className='app__section'>
              <Customers />
            </div>
          </Route>
          <Route exact path={ROUTES.typeServices}>
            <div className='app__section'>
            </div>
          </Route>
          <Route exact path={ROUTES.cheque}>
            <div className='app__section'>
              <Cheque />
            </div>
          </Route>
          <Route exact path={ROUTES.rate}>
            <div className='app__section'>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
