import * as At from './actionTypes';

const initialState = {
  users: {},
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // 
    case At.USERS_FETCH_OK:
      return {users: action.payload};
    case At.USERS_FETCH_NG:
      return state;

    // 
    case At.USER_FETCH_OK:
      const users = state.users;
      const newUsers = users.data.map(d => {
        if (d.id == action.payload.data.id) {
          return {...d, ...action.payload.data};
        } else {
          return d;
        }
      });
      console.log(users);
      console.log(action.payload.data);
      console.log(newUsers);
      return {...state, users: newUsers};
    case At.USER_FETCH_NG:
      return state;

    default:
      return state;
  };
}

export default Reducer;
