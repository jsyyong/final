import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedMyRecipes extends Component {
  render = () => {
    return (
      <div>
        <NavBar />
        <div>Welcome to the MyRecipes page!!</div>
        <div>
          Have a recipe of your own to share?{" "}
          <Link to="/submitrecipe">Submit your recipe here.</Link>
        </div>
      </div>
    );
  };
}
let MyRecipes = connect()(unconnectedMyRecipes);
export default MyRecipes;
