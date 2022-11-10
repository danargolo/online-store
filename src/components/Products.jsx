import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Products extends Component {
  state = {
    isEmpty: true,
    category: [],
  };

  async componentDidMount() {
    const category = await getCategories();
    this.setState({ category });
    // console.log(category);
  }

  render() {
    const { isEmpty, category } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input
          type="text"
        />
        <Link to="/cart" className="btn" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho
          </button>
        </Link>
        {
          isEmpty ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) : <p>Não vazio</p>
        }
        <h3>Categorias</h3>
        {category.map(({ name, id }) => (

          <label key={ id } htmlFor="category">
            <button
              data-testid="category"
              type="button"
            >
              {name}
            </button>
          </label>
        ))}
      </div>
    );
  }
}
