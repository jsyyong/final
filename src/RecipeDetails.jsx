import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import MessageForm from "./MessageForm.jsx";
import Messages from "./Messages.jsx";
import DeleteSingle from "./DeleteSingle.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedRecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }
  deleteOrNothing = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    if (!this.props.admins[username]) deleteOrNothing = null;
    return deleteOrNothing;
  };

  reloadRecipesDetails = async () => {
    let recipeId = this.props.RECIPEID;
    console.log("recipeid", recipeId);
    let response = await fetch("/recipes", {
      method: "POST"
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/recipes response", body);
    let recipe = body.filter(objects => {
      return objects._id === recipeId;
    });
    if (recipe.length === 0) {
      response = await fetch("/favoriterecipes", {
        method: "POST"
      });
      body = await response.text();
      body = JSON.parse(body);
      console.log("/favoriterecipes response", body);
      recipe = body.filter(objects => {
        return objects.oldId === recipeId;
      });
    }
    if (recipe.length === 0) {
      response = await fetch("/promorecipe", {
        method: "POST"
      });
      body = await response.text();
      body = JSON.parse(body);
      console.log("/recipes response", body);
      recipe = body.filter(objects => {
        return objects._id === recipeId;
      });
    }
    this.setState({ recipe: recipe[0] });
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

  addToFavoriteHandler = async event => {
    let data = new FormData();
    let recipe = this.state.recipe;
    console.log("recipe object ID:", recipe._id);
    data.append("imgPath", recipe.imgPath);
    data.append("firstname", recipe.firstname);
    data.append("lastname", recipe.lastname);
    data.append("recipetitle", recipe.recipetitle);
    data.append("numberofservings", recipe.numberofservings);
    data.append("ingredients", recipe.ingredients);
    data.append("directions", recipe.directions);
    data.append("favoritedby", this.props.username);
    data.append("oldId", recipe._id);
    await fetch("/createFavoriteRecipe?collection=favorites", {
      method: "POST",
      body: data
    });
    this.reloadFavoriteRecipes();
  };

  addToFavoriteOrNothing = () => {
    let addToFavoriteOrNothing = (
      <button onClick={this.addToFavoriteHandler}>Add to Favorites!</button>
    );
    console.log("inside favorites?", this.props.insideFavorites);
    if (this.props.insideFavorites || this.props.username === "") {
      addToFavoriteOrNothing = null;
    }
    return addToFavoriteOrNothing;
  };

  leavingSearchResults = () => {
    console.log("dispatching inside-searchresult-false");
    this.props.dispatch({ type: "inside-searchresult-false" });
  };

  componentDidMount = () => {
    console.log("reloading recipe details");
    this.reloadRecipesDetails();
    this.reloadFavoriteRecipes();
    this.leavingSearchResults();
  };

  messageFormOrNothing = imgPath => {
    let messageFormOrNothing = <MessageForm IMGPATH={imgPath} />;
    if (this.props.username === "") messageFormOrNothing = null;
    return messageFormOrNothing;
  };

  preparation = str => {
    console.log("string:", str);
  };

  render = () => {
    let recipe = this.state.recipe;
    return (
      <div>
        <NavBar />
        {console.log("inside recipe details", this.state.recipe)}
        <h2>Welcome to the {recipe.recipetitle} page!!</h2>
        <div>
          <img width="250px" src={recipe.imgPath} />
        </div>
        {this.addToFavoriteOrNothing()}
        <div>
          Ingredients:
          <div>{recipe.ingredients}</div>
        </div>
        <div>
          Preparation:
          <div>{this.state.recipe.directions}</div>
        </div>
        <h2>Comments</h2>
        <Messages IMGPATH={recipe.imgPath} />

        {this.messageFormOrNothing(recipe.imgPath)}
        <div>Recent Recipes</div>
        {this.props.recipes.map(recipes => (
          <div key={"f" + recipes._id}>
            <Link to={"/recipedetail/" + recipes._id}>
              <img width="250px" src={recipes.imgPath} />
            </Link>
            {this.deleteOrNothing(recipes)}
          </div>
        ))}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    recipedetail: state.recipedetail,
    recipeid: state.recipeid,
    username: state.username,
    favoriterecipe: state.favoriterecipe,
    insideFavorites: state.insideFavorites,
    recipes: state.recipes,
    admins: state.admins
  };
};
let RecipeDetails = connect(mapStateToProps)(unconnectedRecipeDetails);
export default RecipeDetails;
