import { createStore } from "redux";
let admins = {};
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

  if (action.type === "show-recipes") {
    return { ...state, recipesIsOpen: true };
  }

  if (action.type === "recipes-off") {
    return { ...state, recipesIsOpen: false };
  }

  if (action.type === "logout") {
    return { ...state, loggedIn: false, username: "", sessionId: "" };
  }

  if (action.type === "set-username") {
    return {
      ...state,
      username: action.username,
      loggedIn: true,
      sessionId: action.sessionId
    };
  }

  if (action.type === "set-admins") {
    admins[action.admins] = true;
    return { ...state, admins: admins };
  }

  if (action.type === "set-recipe") {
    return { ...state, recipes: action.recipes };
  }

  if (action.type === "set-recipedetail") {
    return { ...state, recipedetail: action.recipedetail };
  }

  if (action.type === "set-recipeid") {
    return { ...state, recipeid: action.recipeid };
  }

  return state;
};

let store = createStore(
  reducer,
  {
    joinIsOpen: false,
    recipesIsOpen: false,
    loggedIn: false,
    showLogin: false,
    username: "",
    sessionId: "",
    admins: {},
    recipes: [],
    recipedetail: {},
    recipeid: ""
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
