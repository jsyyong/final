import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingleFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.RECIPE
    };
  }

  reloadFavoriteRecipes = async () => {
    //let name = this.state.username;
    let response = await fetch("/favoriterecipes", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/favoriterecipes response", body);
    this.props.dispatch({ type: "set-favoriterecipe", favoriterecipe: body });
  };

  deleteHandler = async event => {
    let imgPath = this.state.recipe.imgPath;
    console.log("fetching deleteSingleFavorite", imgPath);
    //event.preventDefault();
    let response = await fetch("/deleteSingleFavorite?imgPath=" + imgPath, {
      method: "POST"
    });
    let body = await response.json();
    console.log("deleteHandler body", body);
    //this.reloadFavoriteRecipes();
    location.reload();
  };

  componentDidMount = () => {
    //this.reloadFavoriteRecipes();
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        x?
      </button>
    );
  };
}
let mapStateToProps = state => {
  return { username: state.username };
};
let DeleteSingleFavorite = connect(mapStateToProps)(
  unconnectedDeleteSingleFavorite
);
export default DeleteSingleFavorite;
