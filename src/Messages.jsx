import React, { Component } from "react";
import { connect } from "react-redux";
import DeleteSingleMessage from "./DeleteSingleMessage.jsx";
//import DeleteSingleMessage from "./DeleteSingleMessage.jsx";

let unique = arr => {
  let obj = {};
  arr.forEach(x => {
    obj[x] = true;
  });
  return Object.keys(obj);
};
let usernameList = names => {
  return (
    <ul>
      {unique(names).map(userName => {
        return <li>{userName}</li>;
      })}
    </ul>
  );
};

class unconnectedMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      timeStamp: ""
    };
  }
  usernames = () => {
    let now = new Date() / 1;
    let recentMessages = this.props.messages.filter(msg => {
      return now - msg.timestamp < 5 * 60 * 1000;
    });
    let recentNames = recentMessages.map(msg => {
      return msg.username;
    });
    return recentNames;
  };

  reloadMessages = async () => {
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
  };

  componentDidMount = async () => {
    console.log("insides Messages reloadmessages");
    setTimeout(this.reloadMessages, 350);
  };

  render = () => {
    let msgToElementAdmin = e => (
      <div>
        [Admin Privilege] {e.username} wrote: {e.message}{" "}
        {<DeleteSingleMessage ID={e._id} IMGPATH={this.props.IMGPATH} />}
      </div>
    );
    let msgToElement = e => (
      <div>
        {e.username} wrote: {e.message}{" "}
      </div>
    );
    if (this.props.username === "jeff" || this.props.username === "admin") {
      return (
        <div class="two-col">
          <div>{this.props.messages.map(msgToElementAdmin)}</div>
        </div>
      );
    }
    return (
      <div class="two-col">
        <div>{this.props.messages.map(msgToElement)}</div>
        {this.componentDidMount}
      </div>
    );
  };
}

let mapStatetoProps = state => {
  return {
    recipes: state.recipes,
    username: state.username,
    messages: state.messages
  };
};
let Messages = connect(mapStatetoProps)(unconnectedMessages);
export default Messages;
