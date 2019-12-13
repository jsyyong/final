import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DeleteSingleFavorite from "./DeleteSingleFavorite.jsx";
import DeleteSingle from "./DeleteSingle.jsx";
class unconnectedFavorites extends Component {
  deleteOrNothing = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingleFavorite recipe={recipes} />;
    return deleteOrNothing;
  };
  deleteOrNothing2 = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    if (!this.props.admins[username]) deleteOrNothing = null;
    return deleteOrNothing;
  };

  insideFavorites = () => {
    console.log("dispatching hide-favoritesbutton");
    this.props.dispatch({ type: "hide-favoritesbutton" });
  };

  leavingSearchResults = () => {
    console.log("dispatching inside-searchresult-false");
    this.props.dispatch({ type: "inside-searchresult-false" });
  };

  favoriteOrMsg = () => {
    let favoriteOrMsg = (
      <div>
        {this.props.favoriterecipe.map(recipes => (
          <div key={"f" + recipes._id}>
            <Link to={"/recipedetail/" + recipes.oldId}>
              {" "}
              {/* need to pass the old object ID */}
              <img width="250px" src={recipes.imgPath} />
            </Link>
            {this.deleteOrNothing(recipes)}
          </div>
        ))}
      </div>
    );
    if (this.props.favoriterecipe.length === 0)
      favoriteOrMsg = (
        <div>
          <h3>Currently Empty :(</h3>
        </div>
      );
    return favoriteOrMsg;
  };

  componentDidMount = () => {
    console.log("reloading inside favorites");
    this.insideFavorites();
    this.leavingSearchResults();
  };

  render = () => {
    console.log("inside faorites", this.props.favoriterecipe);
    return (
      <div>
        <NavBar />
        Welcome to the Favorites page!!
        {this.favoriteOrMsg()}
        <div>Recent Recipes</div>
        {this.props.recipes.map(recipes => (
          <div key={"f" + recipes._id}>
            <Link to={"/recipedetail/" + recipes._id}>
              <img width="250px" src={recipes.imgPath} />
            </Link>
            {this.deleteOrNothing2(recipes)}
          </div>
        ))}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    favoriterecipe: state.favoriterecipe,
    userrecipe: state.userrecipe,
    admins: state.admins,
    username: state.username,
    recipes: state.recipes
  };
};
let Favorites = connect(mapStateToProps)(unconnectedFavorites);
export default Favorites;
