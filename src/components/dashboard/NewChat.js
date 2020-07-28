import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context';

const NewChat = () => {
  const [email, setEmail] = useState('');

  const { onNewChatSubmit } = useContext(GlobalContext);

  const onFormSubmit = e => {
    e.preventDefault();
    // add email validation here
    // onNewChatSubmit(email);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h2>Add new chat</h2>
      <label htmlFor="new-chat-email"></label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="text"
        id="new-chat-email"
        autoFocus
      />
      <input type="submit" value="add" />
    </form>
  );
};

export default NewChat;
