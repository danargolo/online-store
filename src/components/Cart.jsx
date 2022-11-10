import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    isCartEmpty: true,
  };

  isCartEmpty = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems === null) return true;
    return false;
  }

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
                    <p data-testid="shopping-cart-product-name">{title}</p>
                    <p>{ price * totalQuantity }</p>
                    <p data-testid="shopping-cart-product-quantity">{ totalQuantity}</p>
                  </div>
              )
            })
          )
        }
      </div>
    );
  }
}
