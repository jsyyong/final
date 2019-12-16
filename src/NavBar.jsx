import React, { Component } from "react";
import { Link } from "react-router-dom";
import Join from "./Join.jsx";
import { connect } from "react-redux";
import Recipes from "./Recipes.jsx";
import Search from "./Search.jsx";
import Messages from "./Messages.jsx";

class unconnectedNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      searchInput: ""
    };
  }
  reload = async () => {
    let checkLoginResponse = await fetch("/check-login", {
      method: "POST",
      credentials: "include"
    });
    let checkLoginResponseBody = await checkLoginResponse.text();
    console.log("checkLoginResponseBody from login", checkLoginResponseBody);
    let body = JSON.parse(checkLoginResponseBody);
    console.log("parsed body", body);
    if (!body.success) {
      console.log("cookie fail");
      return;
    }
    console.log("cookie dispatchinng");
    this.props.dispatch({
      type: "set-username",
      username: body.username,
      sessionId: body.sessionId,
      loggedIn: true
    });
  };

  reloadRecipes = async () => {
    //let name = this.state.username;
    let response = await fetch("/recipes", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/recipes response", body);
    this.props.dispatch({ type: "set-recipe", recipes: body });
  };

  reloadMessages = async () => {
    this.props.dispatch({
      type: "set-messages",
      messages: "Loading Messages..."
    });
  };

  reloadPromoRecipe = async () => {
    //let name = this.state.username;
    let response = await fetch("/promorecipe", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/promorecipes response", body);
    this.props.dispatch({ type: "set-promorecipe", promorecipe: body });
  };

  reloadFavoriteRecipes = async () => {
    let name = this.props.username;
    console.log("inside my recipe~", this.props.username);
    let response = await fetch("/favoriterecipes?favoritedby=" + name, {
      method: "POST"
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("dispatching set-favoriterecipe", body);
    this.props.dispatch({ type: "set-favoriterecipe", favoriterecipe: body });
  };

  reloadUserRecipes = async () => {
    let name = this.props.username;
    console.log("inside my recipe~", this.props.username);
    let response = await fetch("/recipes?uploader=" + name, {
      method: "POST"
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("dispatching set-userrecipe", body);
    this.props.dispatch({ type: "set-userrecipe", userrecipe: body });
  };

  reloadAdmins = async () => {
    let checkAdminResponse = await fetch("/check-admins", { method: "POST" });
    let checkAdminResponseBody = await checkAdminResponse.text();
    console.log("checking admins", checkAdminResponseBody);
    let body = JSON.parse(checkAdminResponseBody);
    if (!body.success) {
      console.log("admin check failed");
      return;
    }
    console.log("dispatching admins", body.admins);
    let admins = body.admins;
    admins.map(obj => {
      this.props.dispatch({
        type: "set-admins",
        admins: obj.username
      });
    });
  };

  renderJoin = () => {
    console.log("disatching join");
    this.props.dispatch({ type: "join" });
  };

  logoutHandler = async () => {
    //delete the sessionId
    event.preventDefault();
    let sessionId = this.props.sessionId;
    let response = await fetch("/deleteSessionId?sessionId=" + sessionId, {
      method: "POST"
    });
    let body = await response.json();
    console.log("logoutHandler body", body);
    if (!body.success) {
      console.log("fail :(");
    }
    console.log("success! :D");
    console.log("disatching logout");
    this.props.dispatch({ type: "logout" });
  };

  joinOrLogout = () => {
    let joinOrLogout = (
      <div className="navbar-logout">
        <Link to="/">
          <a href="#" id="nav" onClick={this.logoutHandler}>
            Logout
          </a>
        </Link>
      </div>
    );

    if (!this.props.loggedIn) {
      joinOrLogout = (
        <div>
          <a href="#" id="nav" onClick={this.renderJoin}>
            Join
          </a>
        </div>
      );
    }
    return joinOrLogout;
  };

  welcomeOrNothing = () => {
    let username = this.props.username;
    console.log("list of admins", this.props.admins);
    console.log("inside welcome or nothing", this.props.admins[username]);
    let welcomeOrNothing = (
      <div className="navbar-welcome">Welcome, {username}!</div>
    );
    if (!this.props.loggedIn) {
      welcomeOrNothing = null;
    } else if (this.props.loggedIn && this.props.admins[username]) {
      console.log("admin", this.props.admins[username]);
      welcomeOrNothing = (
        <div className="navbar-welcome">
          [Admin Privilege]Welcome, {username}!
        </div>
      );
    }
    return welcomeOrNothing;
  };

  favoritesOrNothing = () => {
    let favoritesOrNothing = (
      <div>
        <Link to="/favorites" id="nav" className="navbar-favorites">
          Favorites
        </Link>
      </div>
    );
    if (!this.props.loggedIn) {
      favoritesOrNothing = null;
    }
    return favoritesOrNothing;
  };

  myRecipesOrNothing = () => {
    let myRecipesOrNothing = (
      <div>
        <Link to="/myrecipes" id="nav" className="navbar-myrecipes">
          My Recipes
        </Link>
      </div>
    );
    if (!this.props.loggedIn) {
      myRecipesOrNothing = null;
    }
    return myRecipesOrNothing;
  };

  turnRecipesOn = () => {
    console.log("disatching show-recipes");
    this.props.dispatch({ type: "show-recipes" });
  };

  searchChange = event => {
    console.log("inside searchChange", event.target.value);
    this.setState({ searchInput: event.target.value });
  };

  searchResults = async event => {
    console.log("not finished yet");
    //renders the <Search /> page
  };

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    await console.log("reloading admins");
    await this.reloadAdmins();
    await console.log("reloading states");
    await this.reload();
    await console.log("reloading recipes");
    await this.reloadRecipes();
    await console.log("reloading user recipes");
    await this.reloadUserRecipes();
    await console.log("reloading favorite recipe");
    await this.reloadFavoriteRecipes();
    await console.log("reloading promo recipe");
    await this.reloadPromoRecipe();
    this.props.dispatch({ type: "set-searchInput", searchInput: "" });
    //this.reloadMessages();
  };

  render = () => {
    return (
      <div>
        <div className="container-nav">
          {<div className="welcome">{this.welcomeOrNothing()}</div>}
          <div className="nav-bar">
            <div className="navbar-brand">
              <Link to="/" id="nav">
                TasteShare
              </Link>
            </div>
            {/* Home button */}
            <div>
              <a
                className="navbar-recipes"
                href="#"
                id="nav"
                onClick={this.turnRecipesOn}
              >
                Recipes!
              </a>
            </div>
            {/* Recipes button -- make it conditional render like Join */}
            {this.myRecipesOrNothing()}
            {this.favoritesOrNothing()}
            {/* Favorites button */}
            {this.joinOrLogout()} {/* renders Join or Logout button */}
            <Search />
          </div>
        </div>
        <Join />{" "}
        {/* conditionnal rennder. if joinIsOpen is true, it will render; else it is null */}
        <Recipes />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    joinIsOpen: false,
    recipesIsOpen: state.recipesIsOpen,
    username: state.username,
    loggedIn: state.loggedIn,
    sessionId: state.sessionId,
    admins: state.admins
  };
};
let NavBar = connect(mapStateToProps)(unconnectedNavBar);
export default NavBar;
