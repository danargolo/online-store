import React from 'react';
import PropTypes from 'prop-types';
import Review from '../components/Review';
import { getProductById } from '../services/api';

class ProductsDetails extends React.Component {
  state = {
    productDetails: { },
  };

  async componentDidMount() {
    this.handleProduct();
  }

  handleProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    const productDetails = await getProductById(params.id);
    this.setState({ productDetails });
  };

  isRepeatedItem = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const isRepeated = storage.some((item) => item.id === product.id);
    return isRepeated;
  };

  addOne = (product) => {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const nonRepeatedItems = storage.filter((item) => item.id !== product.id);
    const repeatedItem = storage.find((item) => item.id === product.id);
    const { totalQuantity } = repeatedItem;
    const newQuantity = totalQuantity + 1;
    product.totalQuantity = newQuantity;
    const newStorage = [...nonRepeatedItems, product];
    localStorage.setItem('cart', JSON.stringify(newStorage));
  };

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
  };

  render() {
    const { history, location: {
      // data: { addToCartDetails },
      state: { product } } } = this.props;
    const { productDetails } = this.state;
    return (
      <>
        <h1>Detalhes do Produto</h1>
        <div
          data-testid="product-detail-price"
        >
          { productDetails.price }
        </div>
        <div
          data-testid="product-detail-name"
        >
          { productDetails.title }
        </div>
        <img
          data-testid="product-detail-image"
          src={ productDetails.thumbnail }
          alt={ productDetails.id }
        />
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.addToCart(productDetails) }
          type="button"
        >
          Adicionar ao carrinho
        </button>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Ir para carrinho

        </button>

        <Review
          productId={ product.id }
        />
      </>
    );
  }
}
ProductsDetails.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProductsDetails;
