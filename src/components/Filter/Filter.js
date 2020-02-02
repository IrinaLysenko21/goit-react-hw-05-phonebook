import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, handleChangeFilter }) => {
  return (
    <input
      className={styles.search}
      type="text"
      value={value}
      onChange={handleChangeFilter}
      placeholder="Find contact..."
    />
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
