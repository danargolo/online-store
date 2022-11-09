import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Products extends Component {
  state = {
    isEmpty: true,
  };

  render() {
    const { isEmpty } = this.state;
    return (
      <div>
        <input
          type="text"
        />
        <Link to="/cart" className="btn" data-testid="shopping-cart-button">
          <button type="button">
            Teste Link
          </button>
        </Link>
        {
          isEmpty ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) : <p>Não vazio</p>
        }
      </div>
    );
  }
}
