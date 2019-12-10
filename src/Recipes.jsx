import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
class unconnectedRecipes extends Component {
  renderRecipesOff = () => {
    console.log("dispatching recipes-off");
    this.props.dispatch({ type: "recipes-off" });
  };

  render = () => {
    let renderRecipes = (
      <div>
        {/*<NavBar />*/}
        Welcome to the recipe page! <div>Occasion | Special Diet | Easy</div>
        <button onClick={this.renderRecipesOff}>x</button>
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
    recipesIsOpen: state.recipesIsOpen
  };
};

let Recipes = connect(mapStateToProps)(unconnectedRecipes);
export default Recipes;
