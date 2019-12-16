import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class unconnectedFooter extends Component {
  render = () => {
    return (
      <div className="footer">
        <Link to="/" className="footer-brand">
          TasteShare
        </Link>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {};
};

let Footer = connect(mapStateToProps)(unconnectedFooter);
export default Footer;
