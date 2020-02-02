import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ name, number, handleDeleteContact }) => (
  <div className={styles.contactWrap}>
    <p className={styles.contact}>
      <span className={styles.name}>{name}</span>:{' '}
      <span className={styles.number}>{number}</span>
    </p>
    <button
      className={styles.deleteBtn}
      type="button"
      onClick={handleDeleteContact}
    >
      Delete
    </button>
  </div>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default Contact;
