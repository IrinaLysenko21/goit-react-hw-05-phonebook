import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {
    handleAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  inputIds = {
    nameId: shortid.generate(),
    numberId: shortid.generate(),
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    const { handleAddContact } = this.props;
    handleAddContact(name, number);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    const { nameId, numberId } = this.inputIds;

    return (
      <form className={styles.contactForm} onSubmit={this.handleSubmit}>
        <label htmlFor={nameId} className={styles.label}>
          <span className={styles.inputName}>Enter name:</span>
          <input
            id={nameId}
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor={numberId} className={styles.label}>
          <span className={styles.inputName}>Enter number:</span>
          <input
            id={numberId}
            className={styles.input}
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={styles.submitBtn}>
          Save contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
