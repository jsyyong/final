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
        <div>
          {/*this.props.favoriterecipe.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img height="100px" src={recipes.imgPath} />
              </Link>
              {this.deleteOrNothing(recipes)}
            </div>
        ))*/}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    favoriterecipe: state.favoriterecipe
  };
};
let Favorites = connect(mapStateToProps)(unconnectedFavorites);
export default Favorites;
