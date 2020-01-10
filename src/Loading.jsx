import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "./Homepage.jsx";
import Recipes from "./Recipes.jsx";
import Favorites from "./Favorites.jsx";
import MyRecipes from "./MyRecipes.jsx";
import SubmitRecipe from "./SubmitRecipe.jsx";
import RecipeDetails from "./RecipeDetails.jsx";
import SearchResults from "./SearchResults.jsx";
import RecipePromotional from "./RecipePromotional.jsx";

class unconnectedLoading extends Component {
  render = () => {
    return <div className="loading">Loading...</div>;
  };
}
let mapStateToProps = state => {
  return {
    username: state.username,
    recipes: state.recipes,
    loggedIn: state.loggedIn
  };
};
let Loading = connect(mapStateToProps)(unconnectedLoading);
export default Loading;
