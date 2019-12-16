import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import DeleteSingle from "./DeleteSingle.jsx";
class unconnectedMyRecipes extends Component {
  reloadUserRecipes = async () => {
    let name = this.props.username;
    console.log("inside my recipe~", this.props.username);
    let response = await fetch("/recipes?uploader=" + name, { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/recipes inside my recipes response", body);
    this.props.dispatch({ type: "set-userrecipe", userrecipe: body });
  };

  deleteOrNothing = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    return deleteOrNothing;
  };

  deleteOrNothing2 = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    if (!this.props.admins[username]) deleteOrNothing = null;
    return deleteOrNothing;
  };

  leavingFavorites = () => {
    console.log("dispatching show-favoritesbutton");
    this.props.dispatch({ type: "show-favoritesbutton" });
  };

  leavingSearchResults = () => {
    console.log("dispatching inside-searchresult-false");
    this.props.dispatch({ type: "inside-searchresult-false" });
  };

  componentDidMount = async () => {
    console.log("reloading recipes");
    this.leavingFavorites();
    this.leavingSearchResults();
    //await this.reloadUserRecipes();
  };

  myRecipesOrMsg = () => {
    let myRecipesOrMsg = (
      <div>
        <div className="the-child">
          {this.props.userrecipe.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img
                  id="recipes"
                  width="250px"
                  height="250px"
                  src={recipes.imgPath}
                />
              </Link>
              <div>{recipes.recipetitle}</div>
              <div>{this.deleteOrNothing(recipes)}</div>
            </div>
          ))}
        </div>
      </div>
    );
    if (this.props.userrecipe.length === 0)
      myRecipesOrMsg = (
        <div>
          <h3 className="banner">Currently Empty :(</h3>
        </div>
      );
    return myRecipesOrMsg;
  };

  render = () => {
    return (
      <div>
        <NavBar />
        <h2 className="banner">Your Recipes</h2>
        {this.myRecipesOrMsg()}
        <div className="submit-container">
          <h2 id="text">Submit a recipe to TasteShare!</h2>
          <div id="text">
            Have a recipe of your own to share?{" "}
            <Link to="/submitrecipe">Submit your recipe here.</Link>
          </div>
        </div>

        <div className="rr-container">
          <div className="rr">Recent Recipes!</div>
        </div>
        <div className="the-child">
          {this.props.recipes.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img
                  id="recipes"
                  width="250px"
                  height="250px"
                  src={recipes.imgPath}
                />
              </Link>
              <div>{recipes.recipetitle}</div>
              <div>{this.deleteOrNothing2(recipes)}</div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    userrecipe: state.userrecipe,
    username: state.username,
    admins: state.admins,
    recipes: state.recipes
  };
};
let MyRecipes = connect(mapStateToProps)(unconnectedMyRecipes);
export default MyRecipes;
