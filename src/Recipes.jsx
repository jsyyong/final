import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
class unconnectedRecipes extends Component {
  //reload method to reload state by sending fetch requests
  //not needed anymore
  /*reload = async () => {
    let response = await fetch("/check-login", {
      method: "POST",
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
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
  };*/

  //component did mount method
  componentDidMount = async () => {
    this.reload();
  };

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
