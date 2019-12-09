import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";
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
  //component did mount method
  componentDidMount = async () => {
    this.reload();
    await this.reloadAdmins();
  };

  render = () => {
    return (
      <div className="containerAll">
        <NavBar />
        <div>Welcome to my site!</div>
        <div>
          {/*this.props.recipes.map(recipes => (
            <div key={"f" + recipes._id}>
              <Link to={"/recipedetail/" + recipes._id}>
                <img height="100px" src={recipes.imgPath} />
              </Link>
            </div>
          ))*/}
        </div>
        <div>Recent Recipes</div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};
let Homepage = connect(mapStateToProps)(unconnectedHomepage);
export default Homepage;
