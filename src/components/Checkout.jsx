import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  state = {
    radioChecked: false,
    isValid: false,
    name: '',
    adress: '',
    phone: '',
    cep: '',
    cpf: '',
    email: '',
    payment: '',
  };

  handleClick = (e) => {
    e.preventDefault();
    const { history } = this.props;
    localStorage.removeItem('cart');
    history.push('/');
  };

  handleBtn = () => {
    const { name, adress, phone, cep, cpf, email, payment } = this.state;
    const validateArr = [name, adress, phone, cep, cpf, email, payment];
    const isValid = validateArr.every((element) => element.length > 0);
    if (isValid) {
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    if (name.length > 0) {
      this.setState({
        [name]: value,
      }, () => this.handleBtn());
    }
  };

  handleRadio = ({ target }) => {
    const { id } = target;
    this.setState({
      payment: id,
      radioChecked: true,
    }, () => this.handleBtn());
  };

  render() {
    const storage = JSON.parse(localStorage.getItem('cart'));
    const { radioChecked, isValid } = this.state;
    return (
      <div>
        <h1>Revise seus produtos</h1>
        {
          storage.map((item) => (
            <div key={ item.id }>
              <div>{ item.title }</div>
              <p>{ `R$ ${item.price}` }</p>
              <p>{ item.totalQuantity }</p>
            </div>
          ))
        }
        <form>
          <input
            data-testid="checkout-fullname"
            placeholder="Nome"
            required
            name="name"
            onChange={ this.handleInputChange }
          />
          <input
            data-testid="checkout-email"
            placeholder="E-mail"
            required
            name="email"
            onChange={ this.handleInputChange }
          />
          <input
            data-testid="checkout-cpf"
            placeholder="CPF"
            required
            name="cpf"
            onChange={ this.handleInputChange }
          />
          <input
            data-testid="checkout-phone"
            placeholder="Telefone"
            required
            name="phone"
            onChange={ this.handleInputChange }
          />
          <input
            data-testid="checkout-cep"
            placeholder="CEP"
            required
            name="cep"
            onChange={ this.handleInputChange }
          />
          <input
            data-testid="checkout-address"
            placeholder="Endereço"
            required
            name="adress"
            onChange={ this.handleInputChange }
          />
          <div>
            <label htmlFor="boleto">
              Boleto
              <input
                data-testid="ticket-payment"
                id="boleto"
                type="radio"
                required={ !radioChecked }
                name="payment"
                onChange={ this.handleRadio }
              />
            </label>
          </div>
          <div>
            <label htmlFor="visa">
              Visa
              <input
                data-testid="visa-payment"
                id="visa"
                type="radio"
                required={ !radioChecked }
                name="payment"
                onChange={ this.handleRadio }
              />
            </label>
          </div>
          <div>
            <label htmlFor="master">
              Master
              <input
                data-testid="master-payment"
                id="master"
                type="radio"
                required={ !radioChecked }
                name="payment"
                onChange={ this.handleRadio }
              />
            </label>
          </div>
          <div>
            <label htmlFor="elo">
              Elo
              <input
                data-testid="elo-payment"
                id="elo"
                type="radio"
                required={ !radioChecked }
                name="payment"
                onChange={ this.handleRadio }
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="checkout-btn"
            disabled={ !isValid }
            onClick={ this.handleClick }
          >
            Submit
          </button>
        </form>
        {
          !isValid && <p data-testid="error-msg">Campos inválidos</p>
        }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
