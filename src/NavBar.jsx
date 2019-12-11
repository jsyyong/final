import React, { Component } from "react";
import { Link } from "react-router-dom";
import Join from "./Join.jsx";
import { connect } from "react-redux";
import Recipes from "./Recipes.jsx";

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

  reloadFavoriteRecipes = async () => {
    let name = this.props.username;
    console.log("inside my recipe~", this.props.username);
    let response = await fetch("/favoriteRecipes?favoritedby=" + name, {
      method: "POST"
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("dispatching set-favoriteRecipe", body);
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
    let joinOrLogout = <button onClick={this.logoutHandler}>Logout</button>;

    if (!this.props.loggedIn) {
      joinOrLogout = <button onClick={this.renderJoin}>Join</button>;
    }
    return joinOrLogout;
  };

  welcomeOrNothing = () => {
    let username = this.props.username;
    console.log("list of admins", this.props.admins);
    console.log("inside welcome or nothing", this.props.admins[username]);
    let welcomeOrNothing = <div>Welcome, {username}!</div>;
    if (!this.props.loggedIn) {
      welcomeOrNothing = null;
    } else if (this.props.loggedIn && this.props.admins[username]) {
      console.log("admin", this.props.admins[username]);
      welcomeOrNothing = <div>[Admin Privilege]Welcome, {username}!</div>;
    }
    return welcomeOrNothing;
  };

  favoritesOrNothing = () => {
    let favoritesOrNothing = (
      <Link to="/favorites">
        <button>Favorites</button>
      </Link>
    );
    if (!this.props.loggedIn) {
      favoritesOrNothing = null;
    }
    return favoritesOrNothing;
  };

  myRecipesOrNothing = () => {
    let myRecipesOrNothing = (
      <Link to="/myrecipes">
        <button>My Recipes</button>
      </Link>
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
    console.log("reloading admins");
    await this.reloadAdmins();
    console.log("reloading states");
    await this.reload();
    console.log("reloading recipes");
    await this.reloadRecipes();
    console.log("reloading user recipes");
    await this.reloadUserRecipes();
  };

  render = () => {
    return (
      <div className="container-nav">
        <div className="nav-bar">
          <div>{this.welcomeOrNothing()}</div>
          <Link to="/">
            <button>TasteShare</button>
          </Link>{" "}
          {/* Home button */}
          <button onClick={this.turnRecipesOn}>Recipes!</button>
          {/* Recipes button -- make it conditional render like Join */}
          {this.myRecipesOrNothing()}
          {this.favoritesOrNothing()}
          {/* Favorites button */}
          This is the navigation bar!
          {this.joinOrLogout()} {/* renders Join or Logout button */}
          <form onSubmit={this.searchResults}>
            <input
              type="text"
              onChange={this.searchChange}
              placeholder="Search"
            ></input>
            <input type="submit" value="o" />
          </form>
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
