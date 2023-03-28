// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const EDIT_USER = 'session/editUser'

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const editUser = (user) => {
  return {
    type: EDIT_USER,
    payload: user
  }
}


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// frontend/src/store/session.js
// ...
export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
// ...

// frontend/src/store/session.js
// ...
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;

  console.log(user)
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
      picture_url: 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
// ...

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });

  dispatch(removeUser());
  return response;
}

export const editUserThunk = (editedUser) => async (dispatch) => {
  const response = await csrfFetch(`/api/session/edit`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedUser)
})


if (response.ok) {
    const user = await response.json();
    dispatch(editUser(user));
    return user
}
}


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case EDIT_USER:
      newState = Object.assign({}, state);
      const updatedUser = { ...action.payload }
      newState.user = updatedUser;
      return newState
    default:
      return state;
  }
};

export default sessionReducer;
