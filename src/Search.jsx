import { connect } from "react-redux";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class UnconnectedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ""
    };
  }
  submitHandler = async () => {
    console.log("reloading search results", this.props.searchInput);
    let response = await fetch(
      "/searchResults?directions=" + this.props.searchInput,
      { method: "POST" }
    );
    let body = await response.json();
    console.log("handle results body", body);
    this.props.dispatch({ type: "set-searchResults", searchResults: body });

    /*evt.preventDefault();
    console.log("dispatch search-query");
    this.props.dispatch({
      type: "search-query",
      searchQuery: this.state.searchInput
    });
    this.setState({ searchInput: "" });*/
    //this.props.history.push("/searchResults");
  };
  onChangeHandler = evt => {
    console.log("change handler", evt.target.value);
    //this.setState({ searchInput: evt.target.value });
    this.props.dispatch({
      type: "set-searchInput",
      searchInput: evt.target.value
    });
  };

  onSubmitOrNot = () => {
    let onSubmitOrNot = (
      <Link to="/searchResults">
        <button>Go! false</button>
      </Link>
    );
    if (this.props.insideSearchResults)
      onSubmitOrNot = <button onClick={this.submitHandler}>Go! true</button>;
    return onSubmitOrNot;
  };

  render = () => {
    return (
      <div className="search">
        <input
          className="inputSearch"
          type="text"
          placeholder="Search"
          onChange={this.onChangeHandler}
          value={this.props.searchInput}
        />
        {this.onSubmitOrNot()}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    searchQuery: state.searchQuery,
    searchInput: state.searchInput,
    insideSearchResults: state.insideSearchResults
  };
};
let Search = connect(mapStateToProps)(withRouter(UnconnectedSearch));
export default Search;
