import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

const RATING = ['1', '2', '3', '4', '5'];

export default class Review extends Component {
  state = {
    isChecked: [false, false, false, false, false],
    rating: 0,
    hasStorage: false,
  };

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({
      [id]: value,
    });
  };

  onClickSubmit = (event) => {
    event.preventDefault();
    const { email, text, rating, hasStorage } = this.state;
    const { ProductId } = this.props;
    const saveReview = {
      ProductId,
      email,
      text,
      rating,
    };

    const storage = JSON.parse(localStorage.getItem('reviews'));
    if (!storage) {
      localStorage.setItem('reviews', JSON.stringify([saveReview]));
      this.setState({ hasStorage: true });
    } else {
      const newStorage = [...storage, saveReview];
      localStorage.setItem('reviews', JSON.stringify(newStorage));
    }
    this.refreshStorage();
    this.forceUpdate();
  };

  refreshStorage = () => {
    const storage = JSON.parse(localStorage.getItem('reviews'))
    storage.forEach((item) => {
      const { ProductId, email, rating, text } = item; 
      const obj = {
        email,
        rating,
        text,
      };
      localStorage.setItem(ProductId, JSON.stringify(obj));
    })
  };

  handleRadio = (index) => {
    const { isChecked } = this.state;
    isChecked.forEach((__check, i) => {
      if (i <= index) {
        isChecked[i] = true;
      } else {
        isChecked[i] = false;
      }
    });
    this.setState({
      isChecked,
      rating: index + 1,
    });
  };

  render() {
    const { isChecked, hasStorage } = this.state;
    return (
      <>
        <form>
          <h3>Avaliação</h3>
          {
            RATING.map((rate, index) => (
              <input
                key={ index }
                data-testid={ `${index + 1}-rating` }
                type="checkbox"
                onChange={ () => this.handleRadio(index) }
                checked={ isChecked[index] }
              />
            ))
          }
          <input
            data-testid="product-detail-email"
            id="email"
            type="email"
            required
            onChange={ this.handleChange }
          />
          <textarea
            data-testid="product-detail-evaluation"
            id="text"
            style={ { resize: 'none' } }
            cols={ 40 }
            rows={ 5 }
            required
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            onClick={ this.onClickSubmit }
            type="submit"
          >
            Enviar
          </button>
        </form>
        {
          hasStorage && <Comments />
        }
        <div />
      </>
    );
  }
}

Review.propTypes = {
  ProductId: PropTypes.string.isRequired,
};
