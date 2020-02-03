export const getContacts = () => {
  try {
    const persistedContacts = localStorage.getItem('contacts');

    return persistedContacts === null
      ? undefined
      : JSON.parse(persistedContacts);
  } catch (err) {
    throw new Error('Get state error: ', err);
  }
};

export const saveContacts = contacts => {
  try {
    const contactsToSave = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsToSave);
  } catch (err) {
    throw new Error('Get state error: ', err);
  }
};
