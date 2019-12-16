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

  if (action.type === "set-userrecipe") {
    return { ...state, userrecipe: action.userrecipe };
  }

  if (action.type === "set-favoriterecipe") {
    return { ...state, favoriterecipe: action.favoriterecipe };
  }

  if (action.type === "hide-favoritesbutton") {
    return { ...state, insideFavorites: true };
  }

  if (action.type === "show-favoritesbutton") {
    return { ...state, insideFavorites: false };
  }

  if (action.type === "set-messages") {
    return { ...state, messages: action.messages };
  }

  if (action.type === "search-query") {
    //not used anymore
    return { ...state, searchQuery: action.searchQuery };
  }

  if (action.type === "set-searchResults") {
    return { ...state, searchResults: action.searchResults };
  }

  if (action.type === "set-searchInput") {
    return { ...state, searchInput: action.searchInput };
  }

  if (action.type === "inside-searchresult-true") {
    return { ...state, insideSearchResults: true };
  }

  if (action.type === "inside-searchresult-false") {
    return { ...state, insideSearchResults: false };
  }

  if (action.type === "set-promorecipe") {
    return { ...state, promorecipe: action.promorecipe };
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
    recipeid: "",
    promorecipe: [],
    userrecipe: [],
    favoriterecipe: [],
    insideFavorites: false,
    messages: [],
    searchQuery: "",
    searchResults: [],
    searchInput: "",
    insideSearchResults: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
