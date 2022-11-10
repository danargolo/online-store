import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductById,
} from '../services/api';

export default class Home extends Component {
  state = {
    isEmpty: true,
    category: [],
    inputText: '',
    getProduct: [],
    isHidden: true,
  };

  async componentDidMount() {
    const category = await getCategories();
    this.setState({ category });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputText: value,
    });
  };

  onInputClick = async () => {
    const { inputText } = this.state;
    const getProduct = await getProductsFromCategoryAndQuery('', inputText);
    this.setState({
      getProduct: getProduct.results,
      isHidden: false,
    });
  };

  handleCategoryBtn = async (categoryId) => {
    const response = await getProductsFromCategoryAndQuery(categoryId, '');
    const { results } = response;
    this.setState({ getProduct: results });
  };

  isRepeatedItem = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const isRepeated = storage.some((item) => item.id === product.id);
    return isRepeated;
  }

  addOne = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id)
    console.log(nonRepeatedItems);
    const repeatedItem = storage.find((item) => item.id === product.id)
    let { totalQuantity } = repeatedItem;
    const newQuantity = totalQuantity + 1;
    product.totalQuantity = newQuantity;
    const newStorage = [...nonRepeatedItems, product];
    localStorage.setItem('cart', JSON.stringify(newStorage));
  }

  addToCart = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    if (storage === null) {
      product.totalQuantity = 1;  
      localStorage.setItem('cart', JSON.stringify([product]));
    } else {
      const isRepeated = this.isRepeatedItem(product);
      if (isRepeated) {
        this.addOne(product);
      } else {
        product.totalQuantity = 1;
        const newStorage = [...storage, product];
        localStorage.setItem('cart', JSON.stringify(newStorage));
      }
    }
  }

  render() {
    const { isEmpty, category, inputText, getProduct, isHidden } = this.state;
    return (
      <div>
        <h1>Home</h1>
        {
          isEmpty ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) : <p>Não vazio</p>
        }

        <label htmlFor="query-input">
          <input
            value={ inputText }
            data-testid="query-input"
            type="text"
            placeholder="Buscar"
            id="query-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          onClick={ this.onInputClick }
          data-testid="query-button"
          type="button"
        >
          Pesquisar
        </button>
        <Link to="/cart" className="btn" data-testid="shopping-cart-button">
          <button type="button">
            Carrinho
          </button>
        </Link>
        <h3>Categorias</h3>
        {
          category.map(({ name, id }) => (
            <label key={ id } htmlFor="category">
              <button
                data-testid="category"
                type="button"
                onClick={ () => this.handleCategoryBtn(id) }
              >
                {name}
              </button>
            </label>
          ))
        }
        {
          getProduct.length === 0 ? (
            <p hidden={ isHidden }>
              Nenhum produto foi encontrado
            </p>
          ) : (
            getProduct.map((product) => (
              <div
                key={ product.id }
                data-testid="product"
              >
                <p>{ product.title }</p>
                <p>{product.price}</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addToCart(product) }
                >
                  Adicionar ao carrinho
                </button>
              </div>))
          )
        }
      </div>
    );
  }
}
