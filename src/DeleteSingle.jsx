import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe
    };
  }

  reloadRecipes = async () => {
    //let name = this.state.username;
    let response = await fetch("/recipes", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/recipes response", body);
    this.props.dispatch({ type: "set-recipe", recipes: body });
  };

  deleteHandler = async event => {
    let imgPath = this.state.recipe.imgPath;
    console.log(imgPath);
    event.preventDefault();
    let response = await fetch("/deleteSingle?imgPath=" + imgPath, {
      method: "POST"
    });
    let body = await response.json();
    console.log("deleteHandler body", body);
    this.reloadRecipes();
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        x
      </button>
    );
  };
}
let DeleteSingle = connect()(unconnectedDeleteSingle);
export default DeleteSingle;
