import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import Comments from './components/Comments';
import Checkout from './components/Checkout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/cart" component={ Cart } />
      <Route exact path="/productDetails:id" component={ ProductDetails } />
      <Route exact path="/comments" component={ Comments } />
      <Route exact path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
