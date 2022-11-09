import React, { Component } from 'react';

export default class Products extends Component {
  state = {
    isEmpty: true,
  };

  render() {
    const { isEmpty } = this.state;
    return (
      <div>
        <input
          type="text"
          // onChange={ mudar state }
        />
        <button
          type="button"
        >
          Submit
        </button>
        {
          isEmpty ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          ) : <p>Não vazio</p>
        }
      </div>
    );
  }
}
