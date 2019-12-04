import React, { Component } from "react";
import { connect } from "react-redux";

class unconnectedLogin extends Component {
    
    renderLoginOff = () => {
        this.props.dispatch({type: 'login-off'})
    }
    
    render = () => {

        let renderJoin = (<div>
            Login!
            <form onSubmit={this.submitHandlerJoin}>
                Username
                <input type='text' /*onChange={this.usernameChange} value={this.state.usernameInput}*/ placeholder='username' />
                Password
                <input
                type="password" /*onChange={this.passwordChange} value={this.state.passwordInput}*/ placeholder='password' />
                <input type='submit' value='Join Now!' />
            </form>
            <button onClick={this.renderLoginOff}>x</button>
        </div>)

        if (!this.props.joinIsOpen){
            renderJoin = null
        }
        return(renderJoin)
        
    }
}

let mapStateToProps = state => {

    return { 
        joinIsOpen: state.joinIsOpen
    }
}
let Login = connect(mapStateToProps)(unconnectedLogin);

export default Login;