import { createStore } from "redux";

let reducer = (state, action) => {

    if (action.type === "join") {
        return { ...state, joinIsOpen: true };
      }
    if (action.type === "login") {
        return { ...state, showLogin: true };
      }

    if (action.type === "login-off") {
        return { ...state, showLogin: false };
      }

    if (action.type === "join-off") {
        return { ...state, joinIsOpen: false };
      }
     
    if (action.type === "logout") {
        return { ...state, loggedIn: false };
      }
    return state
}

let store = createStore(
    reducer,
    {
        joinIsOpen: false,
        loggedIn: false,
        showLogin: false
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  export default store;

 