import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DeleteSingle from "./DeleteSingle.jsx";
class unconnectedMyRecipes extends Component {
  reloadUserRecipes = async () => {
    let name = this.props.username;
    console.log("inside my recipe~", this.props.username);
    let response = await fetch("/recipes?uploader=" + name, { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/recipes inside my recipes response", body);
    this.props.dispatch({ type: "set-userrecipe", userrecipe: body });
  };

  deleteOrNothing = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    if (!this.props.admins[username]) deleteOrNothing = null;
    return deleteOrNothing;
  };

  componentDidMount = async () => {
    console.log("reloading recipes");
    //await this.reloadUserRecipes();
  };

  render = () => {
    return (
      <div>
        <NavBar />
        <div>Welcome to your recipes page!!</div>
        <div>
          {this.props.userrecipe.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img height="100px" src={recipes.imgPath} />
              </Link>
              {this.deleteOrNothing(recipes)}
            </div>
          ))}
        </div>
        <div>
          Have a recipe of your own to share?{" "}
          <Link to="/submitrecipe">Submit your recipe here.</Link>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    userrecipe: state.userrecipe,
    username: state.username,
    admins: state.admins
  };
};
let MyRecipes = connect(mapStateToProps)(unconnectedMyRecipes);
export default MyRecipes;
