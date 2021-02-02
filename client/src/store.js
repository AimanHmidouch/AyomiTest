import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { userDetailsReducer, userSigninReducer, userSignupReducer, userUpdateReducer } from "./Reducers/userReducers";

const initialState = {
    userSignin: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
        username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    }
}
const reducer = combineReducers({
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
