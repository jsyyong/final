import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import Footer from "./Footer.jsx";
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
    data.append("lowercasetitle", this.state.recipetitle.toLowerCase());
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
    this.setState({ lastname: "" });
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

  submitHandlerAdmin = async event => {
    console.log("admin999");
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
    await fetch("/createRecipe?collection=promorecipe", {
      method: "POST",
      body: data
    });
    this.setState({ file: "" });
    this.setState({ firstname: "" });
    this.setState({ recipetitle: "" });
    this.setState({ numberofservings: "" });
    this.setState({ ingredients: "" });
    this.setState({ directions: "" });
  };

  fileChangeHandler = event => {
    this.setState({ file: event.target.files[0] });
  };

  submitLoading = () => {
    return null;
  };

  renderAdminSubmit = () => {
    let renderAdminSubmit = (
      <div>
        <button onClick={this.submitHandlerAdmin}>Submit as Promotional</button>
        <button onClick={this.submitLoading}>Submit Loading Image</button>
      </div>
    );
    if (!this.props.admins[this.props.username]) renderAdminSubmit = null;
    return renderAdminSubmit;
  };

  render = () => {
    return (
      <div>
        <NavBar />
        <div className="submit-recipe">
          <div>
            <h2>Submit Your Recipe To TasteShare</h2>
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
                  Please put each ingredient and its measurement on its own
                  line; separated by a backslash "/" (e.g "3 cups milk" should
                  be on its own line.)
                </div>
              </div>
              Directions *
              <div>
                <textarea
                  type="text"
                  onChange={this.onChangeHandler("directions")}
                  required
                />
                <div>
                  Please put each step on its own line separated by a backslash
                  "/"
                </div>
              </div>
              Upload a photo you took of the dish *
              <div>
                <input type="file" onChange={this.fileChangeHandler} required />
              </div>
              <input type="submit" value="Submit" />
            </form>
            {this.renderAdminSubmit()}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { username: state.username, admins: state.admins };
};

let submitRecipe = connect(mapStateToProps)(unconnectedsubmitRecipe);
export default submitRecipe;
