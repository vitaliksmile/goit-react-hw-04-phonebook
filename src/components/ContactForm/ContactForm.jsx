import PropTypes from 'prop-types';
import React, { useState } from 'react';
import s from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleSubmit = e => {
    e.preventDefault();

    addContact({ name, number });
    reset();
  };
  const handleChange = e => {
    const { value } = e.target;
    switch (e.target.name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          placeholder="Name"
          className={s.input}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
      </label>
      <label htmlFor="number">
        Number
        <input
          placeholder="Number"
          className={s.label}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </label>

      <button className={s['button-30']} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
