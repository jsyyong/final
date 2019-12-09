import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      username: ""
    };
  }

  passwordChange = event => {
    console.log("inside passwordChange", event.target.value);
    this.setState({ passwordInput: event.target.value });
  };

  usernameChange = event => {
    console.log("inside usernameChange", event.target.value);
    this.setState({ usernameInput: event.target.value });
  };

  renderLoginOff = () => {
    this.props.dispatch({ type: "login-off" });
  };

  submitHandler = async event => {
    event.preventDefault();
    console.log(this.state.usernameInput);
    console.log(this.state.passwordInput);
    let name = this.state.usernameInput;
    let password = this.state.passwordInput;
    let data = new FormData();
    data.append("username", name);
    data.append("password", password);
    let response = await fetch("/login", { method: "POST", body: data });
    let body = await response.text();
    console.log("/login response", body);
    body = JSON.parse(body);
    if (!body.success) {
      console.log("login failed :(");
      alert("Login Failed");
      this.setState({ usernameInput: "" });
      this.setState({ passwordInput: "" });
      return;
    }
    console.log("login success!!");
    this.setState({ usernameInput: "" });
    this.setState({ passwordInput: "" });
    //this.setState({ username: name });
    console.log("sessionId", body.sessionId);
    this.props.dispatch({
      type: "set-username",
      username: name,
      sessionId: body.sessionId
    });
    this.props.dispatch({ type: "join-off" });
    this.props.dispatch({ type: "login-off" });
    alert("Login Success!");
    return;
  };

  render = () => {
    let renderJoin = (
      <div>
        Login!
        <form onSubmit={this.submitHandler}>
          Username
          <input
            type="text"
            onChange={this.usernameChange}
            value={this.state.usernameInput}
            placeholder="username"
          />
          Password
          <input
            type="password"
            onChange={this.passwordChange}
            value={this.state.passwordInput}
            placeholder="password"
          />
          <input type="submit" value="Log me in!" />
        </form>
        <button onClick={this.renderLoginOff}>x</button>
      </div>
    );

    if (!this.props.joinIsOpen) {
      renderJoin = null;
    }
    return renderJoin;
  };
}

let mapStateToProps = state => {
  return {
    joinIsOpen: state.joinIsOpen,
    username: state.username
  };
};
let Login = connect(mapStateToProps)(unconnectedLogin);

export default Login;
