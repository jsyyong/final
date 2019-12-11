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
  reloadUserRecipes = async () => {
    let name = this.props.username;
    console.log("inside my recipe~", this.props.username);
    let response = await fetch("/recipes?uploader=" + name, { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("dispatching set-userrecipe", body);
    this.props.dispatch({ type: "set-userrecipe", userrecipe: body });
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
    this.reloadUserRecipes();
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        x
      </button>
    );
  };
}
let mapStateToProps = state => {
  return { username: state.username };
};
let DeleteSingle = connect(mapStateToProps)(unconnectedDeleteSingle);
export default DeleteSingle;
