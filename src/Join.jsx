import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login.jsx";

class unconnectedJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: this.props.username
    };
  }

  renderJoinOff = () => {
    this.props.dispatch({ type: "join-off" });
  };

  renderLogin = () => {
    console.log("dispatchinng login");
    this.props.dispatch({ type: "login" });
  };

  usernameChange = event => {
    console.log("inside usernameChange", event.target.value);
    this.setState({ usernameInput: event.target.value });
  };
  passwordChange = event => {
    console.log("inside passwordChange", event.target.value);
    this.setState({ passwordInput: event.target.value });
  };

  submitHandler = async event => {
    console.log("inside submit handler");
    event.preventDefault();
    console.log(this.state.usernameInput);
    console.log(this.state.passwordInput);
    let name = this.state.usernameInput;
    let password = this.state.passwordInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();
    console.log("/signup response", body);
    body = JSON.parse(body);
    if (!body.success) {
      console.log("signup failed :(");
      alert("signup Failed");
      this.setState({ usernameInput: "" });
      this.setState({ passwordInput: "" });
      return;
    }
    console.log("signup success!!", name);
    this.setState({ usernameInput: "" });
    this.setState({ passwordInput: "" });
    console.log("sessionId", body.sessionId);
    this.props.dispatch({
      type: "set-username",
      username: name,
      sessionId: body.sessionId
    });
    this.props.dispatch({ type: "join-off" });
    this.props.dispatch({ type: "login-off" });
    alert("signup Success!");
    return;
  };

  render = () => {
    let renderJoin = (
      <div className="banner">
        <div>
          <h2>Create your very own account!</h2>
          <form onSubmit={this.submitHandler}>
            Username
            <input
              type="text"
              onChange={this.usernameChange}
              value={this.state.usernameInput}
              s
              placeholder="username"
            />
            Password
            <input
              type="password"
              onChange={this.passwordChange}
              value={this.state.passwordInput}
              placeholder="password"
            />
            <input type="submit" value="Join Now!" />
          </form>
          Already have an <button onClick={this.renderLogin}>account?</button>
          <button onClick={this.renderJoinOff}>x</button>
        </div>
      </div>
    );

    if (!this.props.joinIsOpen) {
      renderJoin = null;
    } else if (this.props.joinIsOpen && this.props.showLogin) {
      renderJoin = <Login />;
    }
    return renderJoin;
  };
}

let mapStateToProps = state => {
  return {
    joinIsOpen: state.joinIsOpen,
    recipesIsOpen: state.recipesIsOpen,
    showLogin: state.showLogin,
    username: state.username
  };
};
let Join = connect(mapStateToProps)(unconnectedJoin);

export default Join;
