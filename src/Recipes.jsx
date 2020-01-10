import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedRecipes extends Component {
  renderRecipesOff = () => {
    console.log("dispatching recipes-off");
    this.props.dispatch({ type: "recipes-off" });
  };

  reloadSearchResults = async () => {
    console.log("reloading search results", this.props.searchInput);
    let response = await fetch(
      "/searchResults?lowercasetitle=" + this.props.searchInput.toLowerCase(),
      { method: "POST" }
    );
    let body = await response.json();
    console.log("handle results body", body);
    this.props.dispatch({ type: "set-searchResults", searchResults: body });
  };

  reloadTwice = async () => {
    if (this.props.insideSearchResults) {
      await this.reloadSearchResults();
      await this.reloadSearchResults();
    }
  };

  cookie = async () => {
    console.log("function pressed");

    this.props.dispatch({ type: "set-searchInput", searchInput: "Cookie" });
    this.reloadTwice();
  };
  cake = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Cake" });
    this.reloadTwice();
  };
  brownie = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Brownie" });
    this.reloadTwice();
  };
  lasagna = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Lasagna" });
    this.reloadTwice();
  };
  fettuccine = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Fettuccine" });
    this.reloadTwice();
  };
  mac = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Mac" });
    this.reloadTwice();
  };
  vodka = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Vodka" });
    this.reloadTwice();
  };
  gin = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Gin" });
    this.reloadTwice();
  };
  rum = async () => {
    console.log("function pressed");
    this.props.dispatch({ type: "set-searchInput", searchInput: "Rum" });
    this.reloadTwice();
  };

  render = () => {
    let renderRecipes = (
      <div>
        <div className="recipe-container">
          <div id="col">
            <div>
              <b>Dessert</b>
            </div>
            <div>
              <Link
                id="recipe-list"
                to={"/searchResults"}
                onClick={this.cookie}
              >
                Cookies
              </Link>
            </div>
            <Link id="recipe-list" to={"/searchResults"} onClick={this.cake}>
              Cakes
            </Link>
            <div>
              <Link
                id="recipe-list"
                to={"/searchResults"}
                onClick={this.brownie}
              >
                Brownies
              </Link>
            </div>
            <button onClick={this.renderRecipesOff}>x</button>
          </div>
          <div id="col">
            <div>
              <b>Pasta</b>
            </div>
            <div>
              <Link
                id="recipe-list"
                to={"/searchResults"}
                onClick={this.lasagna}
              >
                Lasagna
              </Link>
            </div>
            <div>
              <Link id="recipe-list" to={"/searchResults"} onClick={this.mac}>
                Mac 'n Cheese
              </Link>
            </div>
            <div>
              <Link
                id="recipe-list"
                to={"/searchResults"}
                onClick={this.fettuccine}
              >
                Fettuccine
              </Link>
            </div>
          </div>
          <div id="col">
            <div>
              <b>Drinks</b>
            </div>
            <div>
              <Link id="recipe-list" to={"/searchResults"} onClick={this.vodka}>
                Vodka
              </Link>
            </div>
            <div>
              <Link id="recipe-list" to={"/searchResults"} onClick={this.gin}>
                Gin
              </Link>
            </div>
            <div>
              <Link id="recipe-list" to={"/searchResults"} onClick={this.rum}>
                Rum
              </Link>
            </div>
          </div>
        </div>

        <div className="recipe-lists"></div>
      </div>
    );

    if (!this.props.recipesIsOpen) {
      renderRecipes = null;
    }

    return renderRecipes;
  };
}

let mapStateToProps = state => {
  return {
    recipesIsOpen: state.recipesIsOpen,
    searchInput: state.searchInput,
    insideSearchResults: state.insideSearchResults
  };
};

let Recipes = connect(mapStateToProps)(unconnectedRecipes);
export default Recipes;
