import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import MessageForm from "./MessageForm.jsx";
import Messages from "./Messages.jsx";
import DeleteSingle from "./DeleteSingle.jsx";
import { connect } from "react-redux";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
class unconnectedRecipePromotional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      favoriteArray: []
    };
  }
  deleteOrNothing = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    if (!this.props.admins[username]) deleteOrNothing = null;
    return deleteOrNothing;
  };

  reloadMessages = async () => {
    //let updateMessages = async () => {
    let imgPath = this.state.recipe.imgPath;
    let response = await fetch("/messages?imgPath=" + imgPath, {
      method: "POST"
    });
    let responseBody = await response.text();
    console.log("response from messages", responseBody);
    let parsed = JSON.parse(responseBody);
    console.log("parsed", parsed);
    this.props.dispatch({
      type: "set-messages",
      messages: parsed
    });
    /*this.setState({
      messages: parsed
    });*/
    //};
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.RECIPEID !== prevProps.RECIPEID) {
      //this.reloadRecipesDetails();
      location.reload();
      //setTimeout(this.reloadMessages(), 1000);
    }
  }

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
      response = await fetch("/promorecipe", {
        method: "POST"
      });
      body = await response.text();
      body = JSON.parse(body);
      console.log("/recipes response", body);
      recipe = body.filter(objects => {
        console.log("recipeID", objects._id);
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

  getFavoriteRecipe = async () => {
    let id = this.state.recipe._id ? this.state.recipe._id : "Loading...";
    console.log("getFavoriteRecipe", id);
    let response = await fetch("/favoriterecipes?oldId=" + id, {
      method: "POST"
    });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("getFavoriteRecipe body", body);
    this.setState({
      favoriteArray: body.filter(recipe => {
        return this.props.username === recipe.favoritedby;
      })
    });
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
    let response = await fetch("/createFavoriteRecipe?collection=favorites", {
      method: "POST",
      body: data
    });
    let body = await response.text();
    body = JSON.parse(body);
    if (!body.success) {
      console.log("fail :(");
      return;
    } else await this.reloadFavoriteRecipes();
    await location.reload();
  };

  addToFavoriteOrNothing = () => {
    let favoriteArray = this.state.favoriteArray;
    console.log("favArr", favoriteArray);
    let addToFavoriteOrNothing = (
      <button onClick={this.addToFavoriteHandler}>Add to Favorites!</button>
    );
    console.log("inside favorites?", this.props.insideFavorites);
    if (favoriteArray.length !== 0 || this.props.username === "") {
      addToFavoriteOrNothing = null;
    }
    return addToFavoriteOrNothing;
  };

  leavingSearchResults = () => {
    console.log("dispatching inside-searchresult-false");
    this.props.dispatch({ type: "inside-searchresult-false" });
  };

  componentDidMount = async () => {
    console.log("reloading recipe details");
    await this.reloadRecipesDetails();
    await this.reloadFavoriteRecipes();
    await this.leavingSearchResults();
    await this.getFavoriteRecipe();
  };

  messageFormOrNothing = imgPath => {
    let messageFormOrNothing = <MessageForm IMGPATH={imgPath} />;
    if (this.props.username === "") messageFormOrNothing = null;
    return messageFormOrNothing;
  };

  preparation = str => {
    console.log("string:", str);
    return str
      ? str.split("\n").map(step => {
          return <li id="step">{step}</li>;
        })
      : "err";
  };
  serving = () => {
    let serving = "servings";
    if (this.state.recipe.numberofservings === "1") {
      serving = "serving";
    }
    return serving;
  };

  render = () => {
    let recipe = this.state.recipe;
    return (
      <div>
        <NavBar />
        <div className="banner-details">
          <div className="banner-notprep">
            <h2>{recipe.recipetitle}</h2>
            <b>{recipe.firstname + " " + recipe.lastname}</b>
            <div>
              <img id="img" width="250px" height="250px" src={recipe.imgPath} />
            </div>
            {this.addToFavoriteOrNothing()}
            <div>
              <div>
                <b>Ingredients</b>
              </div>
              <div>
                for {recipe.numberofservings} {this.serving()}
              </div>
              <div id="list-ingredients">
                {this.preparation(recipe.ingredients)}
              </div>
            </div>
          </div>
          <div className="banner-preparation">
            <div>
              <b>Preparation</b>
            </div>
            <ol>{this.preparation(recipe.directions)}</ol>
          </div>
        </div>
        <div className="banner">
          <div className="chat-box">
            <h2>Comments</h2>
            <Messages IMGPATH={recipe.imgPath} />
            {this.messageFormOrNothing(recipe.imgPath)}
          </div>
        </div>
        <div className="submit-container">
          <h2 id="text">Submit a recipe to TasteShare!</h2>
          <div id="text">
            Have a recipe of your own to share?{" "}
            <Link to="/submitrecipe">Submit your recipe here.</Link>
          </div>
        </div>
        <div className="rr-container">
          <div className="rr">Recent Recipes</div>
        </div>
        <div className="the-child">
          {this.props.recipes.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img
                  width="250px"
                  height="250px"
                  id="recipes"
                  src={recipes.imgPath}
                />
              </Link>
              <div>{recipes.recipetitle}</div>
              {this.deleteOrNothing(recipes)}
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
    recipedetail: state.recipedetail,
    recipeid: state.recipeid,
    username: state.username,
    favoriterecipe: state.favoriterecipe,
    insideFavorites: state.insideFavorites,
    recipes: state.recipes,
    admins: state.admins
  };
};
let RecipePromotional = connect(mapStateToProps)(unconnectedRecipePromotional);
export default RecipePromotional;
