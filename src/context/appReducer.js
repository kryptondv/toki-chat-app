export default (state, action) => {
  switch (action.type) {

    case 'SET_LOG_IN':
      return {...state, isLoggedIn: action.payload}

    case 'SET_USER_EMAIL':
      return {...state, userEmail: action.payload}

    case 'SET_CHATS':
      return {...state, chats: action.payload}

    case 'SELECT_CHAT':
      return {...state, selectedChat: action.payload}

    case 'SET_NEW_CHAT':
      return {...state, newChatWindow: action.payload}

    case 'SET_SIDEBAR':
      return {...state, showSidebar: action.payload}

    default:
      return state;
  }
};
