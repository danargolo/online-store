import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Comments extends Component {
  render() {
    const { productId } = this.props;
    const comments = JSON.parse(localStorage.getItem(productId));
    return (
      <div>
        <h4>Avaliações</h4>
        { !comments ? (
          <p>Sem Avaliações</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={ index }
            >
              <p
                data-testid="review-card-rating"
              >
                {comment.rating}
              </p>
              <p
                data-testid="review-card-email"
              >
                {comment.email}
              </p>
              <p
                data-testid="review-card-evaluation"
              >
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  productId: PropTypes.string.isRequired,
};
