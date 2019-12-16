import React, { Component } from "react";
import { connect } from "react-redux";
//import { timingSafeEqual } from "crypto";
class unconnectedMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      //productId: this.props.productId,
      timeStamp: ""
    };
  }

  submitHandler = async event => {
    let timeStamp = new Date();
    this.setState({ timeStamp: timeStamp });
    console.log("date", this.state.timeStamp);
    //event.preventDefault();
    console.log("form submitted");
    let data = new FormData();
    data.append("msg", this.state.message);
    data.append("username", this.props.username);
    data.append("imgPath", this.props.IMGPATH);
    data.append("timeStamp", this.state.timeStamp);
    let response = await fetch("/newMessage", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let body = await response.text();
    body = JSON.parse(body);
    this.setState({ message: "" });
    console.log("query body", body);
    if (!body.success) {
      console.log("submitHandler failed :(");
      return;
    }
    console.log("submitHandler success!!");
    return;
  };

  inputHandler = event => {
    console.log("inside the inputHandler!", event.target.value);
    this.setState({ message: event.target.value });
  };

  render = () => {
    return (
      <div>
        <h4>Write a review for this recipe!</h4>
        <form onSubmit={this.submitHandler}>
          <textarea
            id="text-box"
            onChange={this.inputHandler}
            value={this.state.message}
          />
          <input id="submit-button" type="submit" />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username
  };
};
let MessageForm = connect(mapStateToProps)(unconnectedMessageForm);
export default MessageForm;
