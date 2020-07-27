export default (state, action) => {
  switch (action.type) {

    case 'SET_LOG_IN':
      return {...state, isLoggedIn: action.payload}


    default:
      return state;
  }
};
