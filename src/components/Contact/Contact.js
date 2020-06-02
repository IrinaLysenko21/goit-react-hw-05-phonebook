import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ name, number, handleDeleteContact }) => (
  <>
    <div className={styles.contactWrap}>
      <div className={styles.contactInfo}>
        <span className={styles.name}>{name}</span>
        <span className={styles.number}>{number}</span>
      </div>
      <button
        className={styles.deleteBtn}
        type="button"
        onClick={handleDeleteContact}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            fill="#fff"
            d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
          />
        </svg>
      </button>
    </div>
    <div className={styles.row} />
  </>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default Contact;
