import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import DeleteSingle from "./DeleteSingle.jsx";
class unconnectedSearchResults extends Component {
  reloadSearchResults = async () => {
    console.log("reloading search results", this.props.searchInput);
    let response = await fetch(
      "/searchResults?directions=" + this.props.searchInput,
      { method: "POST" }
    );
    let body = await response.json();
    console.log("handle results body", body);
    this.props.dispatch({ type: "set-searchResults", searchResults: body });
  };

  insideSearchResults = () => {
    console.log("dispatching inside-searchresult-true");
    this.props.dispatch({ type: "inside-searchresult-true" });
  };

  componentDidMount = async () => {
    this.insideSearchResults();
    setTimeout(this.reloadSearchResults(), 500);
  };

  render = () => {
    return (
      <div>
        <NavBar />
        <div>Welcome to Search Results page!! {this.props.searchInput}</div>
        <div>
          {this.props.searchResults.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img width="250px" src={recipes.imgPath} />
              </Link>
              {/*this.deleteOrNothing(recipes)*/}
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
    username: state.username,
    admins: state.admins,
    searchQuery: state.searchQuery,
    searchResults: state.searchResults,
    searchInput: state.searchInput
  };
};
let SearchResults = connect(mapStateToProps)(unconnectedSearchResults);
export default SearchResults;
