import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

const RATING = ['1', '2', '3', '4', '5'];

export default class Review extends Component {
  state = {
    email: '',
    text: '',
    isChecked: [false, false, false, false, false],
    rating: 0,
  };

  emailValidation = (param) => {
    const regex = /[a-zA-Z0-9._+-]+@\S+/g;
    this.setState({
      isEmailValidate: regex.test(param),
    });
  };

  handleChange = ({ target }) => {
    const { value, id } = target;
    this.setState({
      [id]: value,
    }, () => {
      const { email } = this.state;
      this.emailValidation(email);
    });
  };

  onClickSubmit = (event) => {
    event.preventDefault();
    const { email, text, rating, isEmailValidate } = this.state;
    const { productId } = this.props;
    const saveReview = {
      productId,
      email,
      text,
      rating,
    };
    if (isEmailValidate && rating !== 0) {
      const storage = JSON.parse(localStorage.getItem(`${productId}`));
      if (!storage) {
        localStorage.setItem(productId, JSON.stringify([saveReview]));
        this.setState({
          invalidEmail: false,
          email: '',
          text: '',
        });
      } else {
        const newStorage = [...storage, saveReview];
        localStorage.setItem(productId, JSON.stringify(newStorage));
        this.setState({
          invalidEmail: false,
          email: '',
          text: '',
        });
      }
    } else {
      this.setState({ invalidEmail: true });
    }
    this.forceUpdate();
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
    const { isChecked, invalidEmail, email, text } = this.state;
    const { productId } = this.props;
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
            value={ email }
            onChange={ this.handleChange }
          />
          <textarea
            data-testid="product-detail-evaluation"
            id="text"
            style={ { resize: 'none' } }
            cols={ 40 }
            rows={ 5 }
            value={ text }
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
        { invalidEmail ? (
          <p data-testid="error-msg">Campos inválidos</p>
        ) : null}
        <Comments
          productId={ productId }

        />
        <div />
      </>
    );
  }
}

Review.propTypes = {
  productId: PropTypes.string.isRequired,
};
