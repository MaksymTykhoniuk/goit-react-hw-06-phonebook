import { PhonebookForm } from './PhonebookComponents/PhonebookForm/PhonebookForm';
import { ContactsList } from './PhonebookComponents/ContactsList/ContactsList';
import { Filter } from './PhonebookComponents/Filter/Filter';
import { Section } from './Section/Section';
import { Notification } from './PhonebookComponents/Notification/Notification';
import initValues from '../json/initValues';
import { useEffect, useState } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || initValues;
  });
  const [filter, setFilter] = useState('');

  useEffect(
    prevState => {
      if (contacts !== prevState) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    },
    [contacts]
  );

  const handleFilterChange = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const addContact = contact => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const clearFilterField = () => {
    setFilter('');
  };

  return (
    <>
      <Section title="Add new contact">
        <PhonebookForm
          contacts={contacts}
          addContact={addContact}
        ></PhonebookForm>
      </Section>

      <Section title="Filter contacts">
        <Filter
          onChange={handleFilterChange}
          value={filter}
          onClick={clearFilterField}
        ></Filter>
      </Section>

      <Section title="Saved contacts">
        {contacts.length ? (
          <ContactsList
            filteredContacts={getFilteredContacts()}
            onDelete={deleteContact}
          ></ContactsList>
        ) : (
          <Notification message="There is no contacts in your contact list"></Notification>
        )}
      </Section>
    </>
  );
};
