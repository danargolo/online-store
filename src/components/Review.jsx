import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const arr = [];

export default class Review extends Component {
  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({
      [id]: value,
    });
  };

  onClickSubmit = (event) => {
    event.preventDefault();
    const { email, text } = this.state;
    // const { ProductId } = this.props;
    const saveReview = {
      email,
      text,
    };
    // const test = localStorage.getItem(ProductId);
    // if (test) {
    arr.push(saveReview);
    //   localStorage.setItem(ProductId, JSON.stringify(arr))
    // } else {
    //   localStorage.setItem(ProductId, JSON.stringify(saveReview))
    // }
    console.log(arr);
  };

  render() {
    return (
      <>
        <form>
          <h3>Avaliação</h3>
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
        <div />
      </>
    );
  }
}

Review.propTypes = {
  // ProductId: PropTypes.string.isRequired,
};
