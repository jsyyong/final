import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import DeleteSingle from "./DeleteSingle.jsx";
import { connect } from "react-redux";
class unconnectedHomepage extends Component {
  //reload method to reload state by sending fetch requests
  reload = async () => {
    let checkLoginResponse = await fetch("/check-login", {
      method: "POST",
      credentials: "include"
    });
    let checkLoginResponseBody = await checkLoginResponse.text();
    console.log("checkLoginResponseBody from login", checkLoginResponseBody);
    let body = JSON.parse(checkLoginResponseBody);
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
  };
  //reload admins
  reloadAdmins = async () => {
    let checkAdminResponse = await fetch("/check-admins", { method: "POST" });
    let checkAdminResponseBody = await checkAdminResponse.text();
    console.log("checking admins", checkAdminResponseBody);
    let body = JSON.parse(checkAdminResponseBody);
    if (!body.success) {
      console.log("admin check failed");
      return;
    }
    console.log("dispatching admins", body.admins);
    let admins = body.admins;
    admins.map(obj => {
      this.props.dispatch({
        type: "set-admins",
        admins: obj.username
      });
    });
  };

  leavingFavorites = () => {
    console.log("dispatching show-favoritesbutton");
    this.props.dispatch({ type: "show-favoritesbutton" });
  };

  leavingSearchResults = () => {
    console.log("dispatching inside-searchresult-false");
    this.props.dispatch({ type: "inside-searchresult-false" });
  };

  //component did mount method
  componentDidMount = async () => {
    this.leavingFavorites();
    this.leavingSearchResults();
  };

  deleteOrNothing = recipes => {
    let username = this.props.username;
    let deleteOrNothing = <DeleteSingle recipe={recipes} />;
    if (!this.props.admins[username]) deleteOrNothing = null;
    return deleteOrNothing;
  };

  render = () => {
    return (
      <div className="containerAll">
        <NavBar />
        <div>Welcome to my site!</div>
        {this.props.promorecipe.map(recipes => (
          <div key={"f" + recipes._id}>
            <Link to={"/recipedetail/" + recipes._id}>
              <img height="200px" src={recipes.imgPath} />
            </Link>
            {this.deleteOrNothing(recipes)}
          </div>
        ))}
        <div>Recent Recipes</div>
        <div>
          {this.props.recipes.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img width="250px" src={recipes.imgPath} />
              </Link>
              {this.deleteOrNothing(recipes)}
            </div>
          ))}
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    recipes: state.recipes,
    admins: state.admins,
    username: state.username,
    promorecipe: state.promorecipe
  };
};
let Homepage = connect(mapStateToProps)(unconnectedHomepage);
export default Homepage;
