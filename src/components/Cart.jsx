import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    isCartEmpty: true,
  };

  render() {
    const { isCartEmpty } = this.state;
    return (
      <div>
        {
          isCartEmpty ? (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>
          ) : (
            <p>Carrinho não vazio</p>
          )
        }
      </div>
    );
  }
}
