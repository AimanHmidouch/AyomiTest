import axios from "axios";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCESS, USER_SIGNOUT, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCESS, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_SUCESS } from "../Constants/userConstants";



export const signIn = (username, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await axios.post('http://localhost:8000/api/login/', { username, password })
    const token = data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    dispatch({ type: USER_SIGNIN_SUCESS, payload: username })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_SIGNIN_FAIL, payload: message });
  }
}

export const signOut = () => async (dispatch) => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  dispatch({ type: USER_SIGNOUT })
  document.location.href = '/';
}

export const signUp = (username, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST, payload: { username, email, password } });
  try {
    const { data } = await axios.post('http://127.0.0.1:8000/api/register/', {
      username: username,
      email: email,
      password: password,
    })
    const token = data.token;
    dispatch({ type: USER_SIGNUP_SUCESS, payload: token })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_SIGNUP_FAIL, payload: message });
  }
}

export const userDetails = (username) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: { username } });
  try {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/users/${username}`)
    dispatch({ type: USER_DETAILS_SUCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
}

export const update = (username, email, first_name, last_name) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: { username, email, first_name, last_name } });
  try {
    const { data } = await axios.put(`http://127.0.0.1:8000/api/users/${username}`, { username: username, email: email, first_name: first_name, last_name: last_name })
    dispatch({ type: USER_UPDATE_SUCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
}