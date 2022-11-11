import React, { Component } from 'react';

export default class Cart extends Component {
  isCartEmpty = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    return !cartItems;
  };

  addOneInCart = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const repeatedItem = storage.find((item) => item.id === product.id);
    const { totalQuantity } = repeatedItem;
    const newQuantity = totalQuantity + 1;
    product.totalQuantity = newQuantity;
    const newStorage = [...nonRepeatedItems, product];
    localStorage.setItem('cart', JSON.stringify(newStorage));
    this.setState({ refresh: true });
  };

  removeOne = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const repeatedItem = storage.find((item) => item.id === product.id);
    const { totalQuantity } = repeatedItem;
    if (totalQuantity === 1) return;
    const newQuantity = totalQuantity - 1;
    product.totalQuantity = newQuantity;
    const newStorage = [...nonRepeatedItems, product];
    localStorage.setItem('cart', JSON.stringify(newStorage));
    this.setState({ refresh: true });
  };

  clearItem = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const newStorage = [...nonRepeatedItems];
    localStorage.setItem('cart', JSON.stringify(newStorage));
    this.setState({ refresh: true });
  };

  render() {
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
                    >
                      +
                    </button>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.removeOne(item) }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.clearItem(item) }
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          )
        }
      </div>
    );
  }
}
