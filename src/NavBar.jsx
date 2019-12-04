import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Join from './Join.jsx'
import { connect } from "react-redux";
import Login from './Login.jsx'
class unconnectedNavBar extends Component {

    renderJoin = () => {
        console.log("disatching join")
        this.props.dispatch({type: 'join'})
    }

    logoutHandler = () => {
        console.log("disatching join")
        this.props.dispatch({type: 'logout'})
    }

    joinOrLogout = () => {
        let joinOrLogout = <button onClick={this.logoutHandler}>Logout</button>

        if (!this.props.loggedIn) {
            joinOrLogout = <button onClick={this.renderJoin}>Join</button>
        }
        return joinOrLogout
        
    }

    welcomeOrNothing = () => {
        let welcomeOrNothing = <div>Welcome, user!</div>
        if (!this.props.loggedIn) {
            welcomeOrNothing = null
        } return welcomeOrNothing
    }

    render = () => {
        return (
            <div className='container-nav'>
                <div className='nav-bar'>
                    <div>{this.welcomeOrNothing()}</div>
            <Link to='/'><button>TasteShare</button></Link> 
            <Link to='/recipes'><button>Recipes!</button></Link>
            <Link to='/favorites'><button>Favorites</button></Link>
            This is the navigation bar!
            {this.joinOrLogout()}
                </div>
                <Join />
            </div>
            
            
        )
    }
}
let mapStateToProps = state => {
    return { joinIsOpen: false }
}
let NavBar = connect(mapStateToProps)(unconnectedNavBar);
export default NavBar