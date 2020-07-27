export default (state, action) => {
  switch (action.type) {

    case 'SET_LOG_IN':
      return {...state, isLoggedIn: action.payload}

    case 'SET_USER_EMAIL':
      return {...state, userEmail: action.payload}

    case 'SET_CHATS':
      return {...state, chats: action.payload}


    default:
      return state;
  }
};
