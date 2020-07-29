import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context';
import firebase from 'firebase/app';

const NewChat = () => {
  const [email, setEmail] = useState('');

  const { setNewChatWindow, selectChat, userEmail, chats } = useContext(GlobalContext);

  const onFormSubmit = e => {
    e.preventDefault();
    // add email validation here
    onNewChatSubmit(email);
  };


   const onNewChatSubmit = async newChatEmail => {
     // check if chat exists
     const documentKey = [userEmail, newChatEmail].sort().join(':');
     const chat = await firebase
       .firestore()
       .collection('chats')
       .doc(documentKey)
       .get();
     if (chat.exists) {
       // go to chat
       const chatIndex = chats.findIndex(item =>
         [userEmail, newChatEmail].every(user => item.users.includes(user))
       );
       setNewChatWindow(false);
       selectChat(chatIndex);
     } else {
       // create chat
       await firebase
         .firestore()
         .collection('chats')
         .doc(documentKey)
         .set({
           messages: [],
           receiverHasRead: false,
           users: [userEmail, newChatEmail],
         });
       setNewChatWindow(false);
     }
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
