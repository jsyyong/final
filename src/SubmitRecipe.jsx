import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedsubmitRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      file: "",
      recipetitle: "",
      numberofservings: "",
      ingredients: "",
      directions: ""
    };
  }

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

  onChangeHandler = field => {
    return event => {
      console.log("inside onChangeHandler", event.target.value);
      this.setState({ [field]: event.target.value });
    };
  };

  submitHandler = async event => {
    event.preventDefault();
    console.log(this.state.firstname);
    console.log(this.state.lastname);
  };

  fileChangeHandler = event => {
    this.setState({ file: event.target.files[0] });
  };

  render = () => {
    return (
      <div>
        <NavBar />
        <div>Welcome to the submitRecipe page!!</div>
        <form onSubmit={this.submitHandler}>
          Name *
          <div className="form-container">
            <div className="firstname">
              <input
                type="text"
                onChange={this.onChangeHandler("firstname")}
                required
              />
              <div>First Name</div>
            </div>
            <div className="lastname">
              <input
                type="text"
                onChange={this.onChangeHandler("lastname")}
                required
              />
              <div>Last Name</div>
            </div>
          </div>
          Recipe Title *
          <div>
            <input
              type="text"
              onChange={this.onChangeHandler("recipetitle")}
              required
            />
          </div>
          Number of Servings *
          <div>
            <input
              type="text"
              onChange={this.onChangeHandler("numberofservings")}
              required
            />
          </div>
          Ingredients *
          <div>
            <input
              type="text"
              onChange={this.onChangeHandler("ingredients")}
              required
            />
            <div>
              Please put each ingredient and its measurement on its own line
              (e.g "3 cups milk" should be on its own line.)
            </div>
          </div>
          Directions *
          <div>
            <input
              type="text"
              onChange={this.onChangeHandler("directions")}
              required
            />
            <div>Please put each step on its own line</div>
          </div>
          Upload a photo you took of the dish *
          <div>
            <input type="file" onChange={this.fileChangeHandler} required />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {};

let submitRecipe = connect(mapStateToProps)(unconnectedsubmitRecipe);
export default submitRecipe;
