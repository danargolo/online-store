import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Products } />
      <Route exact path="/cart" component={ Cart } />
    </Switch>
  );
}

export default App;
