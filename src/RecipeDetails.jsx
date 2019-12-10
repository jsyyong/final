import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
class unconnectedRecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
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
    this.setState({ recipe: recipe[0] });
  };

  componentDidMount = () => {
    console.log("reloading recipe details");
    this.reloadRecipesDetails();
  };

  render = () => {
    let recipe = this.state.recipe;
    return (
      <div>
        <NavBar />
        {console.log("inside recipe details", this.state.recipe.lastname)}
        <h2>Welcome to the {recipe.recipetitle} page!!</h2>
        <div>
          <img height="100px" src={recipe.imgPath} />
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { recipedetail: state.recipedetail, recipeid: state.recipeid };
};
let RecipeDetails = connect(mapStateToProps)(unconnectedRecipeDetails);
export default RecipeDetails;
