import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import s from './App.module.css';
import { useState, useEffect } from 'react';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeForm = e => {
    setFilter(e.curentTarget.value);
  };
  const addContact = ({ name, number }) => {
    if (
      contacts.some(contact => {
        return contact.name === name || contact.number === number;
      })
    ) {
      return alert(`${name}: is already in contacts`);
    }
    setContacts(prev => [...prev, { name, number, id: nanoid() }]);
  };

  const filterContact = () => {
    if (filter.length === 0) return contacts;
    const filttredContacts = contacts.filter(el =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
    return filttredContacts;
  };
  const removeContact = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  return (
    <div className={s.div}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter handleChangeForm={handleChangeForm} value={filter} />
      <ContactList
        filterContact={filterContact()}
        removeContact={removeContact}
      />
    </div>
  );
}

export default App;

//   removeContact = id => {
//     this.setState(prev => ({
//       contacts: prev.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     return (
//       <div className={s.div}>
//         <h1>Phonebook</h1>
//         <ContactForm addContact={this.addContact} />

//         <h2>Contacts</h2>
//         <Filter
//           handleChangeForm={this.handleChangeForm}
//           value={this.state.filter}
//         />
//         <ContactList
//           filterContact={this.filterContact()}
//           removeContact={this.removeContact}
//         />
//       </div>
//     );
//   }
// }
