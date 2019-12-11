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
      directions: "",
      uploader: ""
    };
  }

  onChangeHandler = field => {
    return event => {
      console.log("inside onChangeHandler", event.target.value);
      this.setState({ [field]: event.target.value });
    };
  };

  submitHandler = async event => {
    //event.preventDefault();
    console.log(this.state.firstname);
    console.log(this.state.lastname);
    let data = new FormData();
    data.append("file", this.state.file);
    data.append("firstname", this.state.firstname);
    data.append("lastname", this.state.lastname);
    data.append("recipetitle", this.state.recipetitle);
    data.append("numberofservings", this.state.numberofservings);
    data.append("ingredients", this.state.ingredients);
    data.append("directions", this.state.directions);
    data.append("uploader", this.props.username);
    await fetch("/createRecipe?collection=recipes", {
      method: "POST",
      body: data
    });
    this.setState({ file: "" });
    this.setState({ firstname: "" });
    this.setState({ recipetitle: "" });
    this.setState({ numberofservings: "" });
    this.setState({ ingredients: "" });
    this.setState({ directions: "" });
    /*let response = await fetch("/recipes", { method: "POST" });
    let body = await response.text();
    body = JSON.parse(body);
    console.log("/recipes response", body);
    console.log("dispatching set-recipe");
    this.props.dispatch({ type: "set-recipe", recipes: body });
    //this.reload();*/
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
            <textarea
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
            <textarea
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
let mapStateToProps = state => {
  return { username: state.username };
};

let submitRecipe = connect(mapStateToProps)(unconnectedsubmitRecipe);
export default submitRecipe;
