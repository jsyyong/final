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
    let welcomeOrNothing = <div>Welcome, {this.props.username}!</div>;
    if (!this.props.loggedIn) {
      welcomeOrNothing = null;
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
    sessionId: state.sessionId
  };
};
let NavBar = connect(mapStateToProps)(unconnectedNavBar);
export default NavBar;