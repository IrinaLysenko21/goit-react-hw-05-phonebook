import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
import { Notyf } from 'notyf';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import * as localStorage from '../services/localStorage';
import styles from './App.module.css';
import popTransition from '../transitions/pop.module.css';
import slideTransition from '../transitions/slide.module.css';

import 'notyf/notyf.min.css';

const notyf = new Notyf();

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getContacts();

    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.saveContacts(contacts);
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (newContact.name.trim() === '' || newContact.number.trim() === '') {
      return notyf.error('Please fill out the form');
    }
    if (
      !newContact.number.match(/^(\+38|\+3)?[\s-]?(\(?[\d]*\))?[\d\s\- ]*$/)
    ) {
      return notyf.error('Wrong number format');
    }

    const matchingContact = this.findMatchingContact(contacts, newContact.name);

    if (matchingContact) return notyf.error('This contact already exists');

    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => notyf.success('Contact added'),
    );

    return newContact;
  };

  deleteContact = id => {
    this.setState(
      prevState => ({
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      }),
      () => notyf.success('Contact deleted'),
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = (contacts, query) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  findMatchingContact = (contacts, name) =>
    contacts.find(contact => contact.name === name);

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Phonebook</h1>
        <ContactForm handleAddContact={this.addContact} />
        <h2 className={styles.heading}>Contacts</h2>
        {contacts.length === 0 && (
          <h2 className={styles.defaultText}>No contacts saved...</h2>
        )}
        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <Filter value={filter} handleChangeFilter={this.changeFilter} />
        </CSSTransition>
        <CSSTransition
          in={contacts.length > 0}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <ContactList
            contacts={filteredContacts}
            handleDeleteContact={this.deleteContact}
          />
        </CSSTransition>
      </div>
    );
  }
}

export default App;
