  
import React, { Component } from "react";
import { connect } from "react-redux";
import Login from './Login.jsx'

class unconnectedJoin extends Component {
    
    renderJoinOff = () => {
        this.props.dispatch({type: 'join-off'})
    }

    renderLogin = () => {
        console.log("dispatchinng login")
        this.props.dispatch({type: 'login'})
        
    }
    
    render = () => {

        let renderJoin = (<div>
            Welcome!
            <form onSubmit={this.submitHandlerJoin}>
                Username
                <input type='text' /*onChange={this.usernameChange} value={this.state.usernameInput}*/ placeholder='username' />
                Password
                <input
                type="password" /*onChange={this.passwordChange} value={this.state.passwordInput}*/ placeholder='password' />
                <input type='submit' value='Join Now!' />
            </form>
            Already have an <button onClick={this.renderLogin}>account?</button>
            <button onClick={this.renderJoinOff}>x</button>
        </div>)

        if (!this.props.joinIsOpen){
            renderJoin = null
        } else if (this.props.joinIsOpen && this.props.showLogin) {
            renderJoin = <Login />
        }
        return(renderJoin)
        
    }
}

let mapStateToProps = state => {

    return { 
        joinIsOpen: state.joinIsOpen, showLogin: state.showLogin
    }
}
let Join = connect(mapStateToProps)(unconnectedJoin);

export default Join;