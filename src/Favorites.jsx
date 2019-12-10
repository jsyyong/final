import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
class unconnectedFavorites extends Component {
  render = () => {
    console.log("inside faorites");
    return (
      <div>
        <NavBar />
        Welcome to the Favorites page!!
      </div>
    );
  };
}
let Favorites = connect()(unconnectedFavorites);
export default Favorites;
