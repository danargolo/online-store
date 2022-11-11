import React from 'react';
import PropTypes from 'prop-types';
import Review from '../components/Review';
// import { useHistory } from 'react-router-dom';

class ProductsDetails extends React.Component {
  render() {
    const { history, location: {
      data: { addToCartDetails },
      state: { title, thumbnail, price, id, product } } } = this.props;
    return (
      <>
        <h1>Detalhes do Produto</h1>
        <div
          data-testid="product-detail-price"
        >
          { price }
        </div>
        <div
          data-testid="product-detail-name"
        >
          { title }
        </div>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ id }
        />
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCartDetails(product) }
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
          ProductId={ product.id }
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
