import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedMyRecipes extends Component {
  //reload method to reload state by sending fetch requests
  reload = async () => {
    let response = await fetch("/check-login", {
      method: "POST",
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
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
