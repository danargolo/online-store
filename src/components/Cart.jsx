import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  state = {
    addRefresh: false,
    removeRefresh: false,
    clearRefresh: false,
  };

  addOneInCart = (product) => {
    this.setState({ addRefresh: true });
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const repeatedItem = storage.find((item) => item.id === product.id);
    const { totalQuantity } = repeatedItem;
    const newQuantity = totalQuantity + 1;
    product.totalQuantity = newQuantity;
    const newStorage = [...nonRepeatedItems, product];
    localStorage.setItem('cart', JSON.stringify(newStorage));
    this.setState({ addRefresh: false });
  };

  removeOne = (product) => {
    this.setState({ removeRefresh: true });
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const repeatedItem = storage.find((item) => item.id === product.id);
    const { totalQuantity } = repeatedItem;
    if (totalQuantity === 1) return;
    const newQuantity = totalQuantity - 1;
    product.totalQuantity = newQuantity;
    const newStorage = [...nonRepeatedItems, product];
    localStorage.setItem('cart', JSON.stringify(newStorage));
    this.setState({ removeRefresh: false });
  };

  clearItem = (product) => {
    this.setState({ clearRefresh: true });
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const newStorage = [...nonRepeatedItems];
    localStorage.setItem('cart', JSON.stringify(newStorage));
    this.setState({ clearRefresh: false });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  isCartEmpty = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    return !cartItems;
  };

  render() {
    const { addRefresh, removeRefresh, clearRefresh } = this.state;
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    return (
      <div>
        {
          this.isCartEmpty() ? (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          ) : (
            cartItems.map((item) => {
              const { price, title, totalQuantity } = item;
              return (
                <div key={ title }>
                  <div>
                    <p data-testid="shopping-cart-product-name">{title}</p>
                    <p>{ price * totalQuantity }</p>
                    <p data-testid="shopping-cart-product-quantity">{ totalQuantity}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.addOneInCart(item) }
                      disabled={ addRefresh }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.removeOne(item) }
                      disabled={ removeRefresh }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.clearItem(item) }
                      clearRefresh={ clearRefresh }
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          )
        }
        <button
          data-testid="checkout-products"
          onClick={ this.handleClick }
          type="button"
        >
          Finalizar compra
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
