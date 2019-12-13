import React, { Component } from "react";
import { connect } from "react-redux";
class unconnectedDeleteSingleMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      _id: this.props.ID
    };
  }

  reloadMessages = async () => {
    //let updateMessages = async () => {
    let imgPath = this.props.IMGPATH;
    let response = await fetch("/messages?imgPath=" + imgPath, {
      method: "POST"
    });
    let responseBody = await response.text();
    console.log("response from messages", responseBody);
    let parsed = JSON.parse(responseBody);
    console.log("parsed", parsed);
    this.props.dispatch({
      type: "set-messages",
      messages: parsed
    });
    /*this.setState({
      messages: parsed
    });*/
    //};
  };

  deleteHandler = async event => {
    console.log("the unique id", this.state._id);
    event.preventDefault();
    let _id = this.state._id;
    let response = await fetch("/deleteSingleMsg?_id=" + _id, {
      method: "POST"
    });
    let body = await response.json();
    if (!body.success) {
      console.log("deletion fail :(");
      return;
    }
    //write a reload fetch for message
    /*let response2 = await fetch("/messages?imgPath=" + this.props._id, {
      method: "POST"
    });

    let body2 = await response2.text();
    body2 = JSON.parse(body2);
    console.log("/messages response", body2);
    this.props.dispatch({ type: "set-cartItems", cartItems: body2 });
    console.log("deleteHandler body", body);
    this.props.reload();
    return;*/
    //setTimeout(this.reloadMessages, 500);
    this.reloadMessages();
  };

  render = () => {
    return (
      <button type="button" onClick={this.deleteHandler}>
        Delete
      </button>
    );
  };
}
let DeleteSingleMessage = connect()(unconnectedDeleteSingleMessage);
export default DeleteSingleMessage;
