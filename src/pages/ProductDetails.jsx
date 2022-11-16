import React from 'react';
import PropTypes from 'prop-types';
import Review from '../components/Review';
import { getProductById } from '../services/api';

class ProductsDetails extends React.Component {
  state = {
    productDetails: '',
  };

  componentDidMount() {
    this.handleProduct();
  }

  handleProduct = async () => {
    const { match } = this.props;
    const { params } = match;
    console.log(params.id);
    const productDetails = await getProductById(params.id);
    this.setState({ productDetails });
  };

  render() {
    const { history, location: {
      // data: { addToCartDetails },
      state: { product } } } = this.props;
    const { productDetails } = this.state;
    // console.log(history)
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
          // onClick={ () => addToCartDetails(productDetails) }
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
