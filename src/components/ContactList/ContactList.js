import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';
import slideTransition from '../../transitions/slide.module.css';

const ContactList = ({ contacts, handleDeleteContact }) => (
  <TransitionGroup component="ul" className={styles.contactList}>
    {contacts.map(contact => (
      <CSSTransition
        key={contact.id}
        timeout={250}
        unmountOnExit
        classNames={slideTransition}
      >
        <li>
          <Contact
            name={contact.name}
            number={contact.number}
            handleDeleteContact={() => handleDeleteContact(contact.id)}
          />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired,
  ).isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
