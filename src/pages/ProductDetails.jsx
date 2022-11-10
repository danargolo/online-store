import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

class ProductsDetails extends React.Component {
  render() {
    const { history, location: { state: { title, thumbnail, price, id } } } = this.props;
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
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/cart') }
        >
          Ir para carrinho

        </button>
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
