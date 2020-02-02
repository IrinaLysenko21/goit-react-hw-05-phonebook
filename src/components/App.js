import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
import { Notyf } from 'notyf';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import Message from './Message/Message';
import styles from './App.module.css';
import popTransition from '../transitions/pop.module.css';
import appearTransition from '../transitions/appear.module.css';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    contactExists: false,
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');

    if (persistedContacts) {
      const contacts = JSON.parse(persistedContacts);
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
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

    const matchingContact = this.findMatchingContact(contacts, newContact.name);

    if (matchingContact) {
      return this.setState(
        prevState => ({ contactExists: !prevState.contactExists }),
        () =>
          setTimeout(() => {
            this.setState(prevState => ({
              contactExists: !prevState.contactExists,
            }));
          }, 2000),
      );
    }

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
    const { contacts, filter, contactExists } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.wrapper}>
        <CSSTransition in timeout={500} classNames={appearTransition} appear>
          <h1 className={styles.heading}>Phonebook</h1>
        </CSSTransition>

        <ContactForm handleAddContact={this.addContact} />

        <h2 className={styles.heading}>Contacts</h2>

        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <Filter value={filter} handleChangeFilter={this.changeFilter} />
        </CSSTransition>

        <ContactList
          contacts={filteredContacts}
          handleDeleteContact={this.deleteContact}
        />

        <CSSTransition
          in={contactExists}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <Message />
        </CSSTransition>
      </div>
    );
  }
}

export default App;
