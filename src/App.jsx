import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "./Homepage.jsx";
import Recipes from "./Recipes.jsx";
import Favorites from "./Favorites.jsx";
import MyRecipes from "./MyRecipes.jsx";
import SubmitRecipe from "./SubmitRecipe.jsx";
import RecipeDetails from "./RecipeDetails.jsx";

class unconnectedApp extends Component {
  renderHomepage = () => {
    return <Homepage />;
  };

  renderRecipe = () => {
    return <Recipes />;
  };

  renderFavorites = () => {
    return <Favorites />;
  };

  renderMyRecipes = () => {
    return <MyRecipes />;
  };

  renderSubmitRecipe = () => {
    return <SubmitRecipe />;
  };

  renderRecipeDetails = routerData => {
    let recipeId = routerData.match.params.rid;
    console.log("recipe id", recipeId);
    let recipe = this.props.recipes.find(recipe => {
      return recipe._id === recipeId;
    });
    console.log("recipe object", recipe);
    console.log("recipe id", recipeId);
    this.props.dispatch({ type: "set-recipedetail", recipedetail: recipe });
    this.props.dispatch({ type: "set-recipeid", recipeid: recipeId });
    return <RecipeDetails RECIPEID={recipeId} RECIPE={recipe}/>;
  };

  render = () => {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={this.renderHomepage} />{" "}
        {/*renders the main home screen*/}
        <Route exact={true} path="/recipes" render={this.renderRecipe} />
        <Route exact={true} path="/favorites" render={this.renderFavorites} />
        <Route exact={true} path="/myrecipes" render={this.renderMyRecipes} />
        <Route
          exact={true}
          path="/submitrecipe"
          render={this.renderSubmitRecipe}
        />
        <Route
          exact={true}
          path="/recipedetail/:rid"
          render={this.renderRecipeDetails}
        />
      </BrowserRouter>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username,
    recipes: state.recipes,
    loggedIn: state.loggedIn
  };
};
let App = connect(mapStateToProps)(unconnectedApp);
export default App;
