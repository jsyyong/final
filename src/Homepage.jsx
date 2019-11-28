import React, { Component } from 'react'
import { Link } from "react-router-dom";
class Homepage extends Component {
    render = () => {
        return (
            <div>Welcome to my site!
                <Link to='/recipe'><button>recipes! :D</button></Link>
            </div>
            
        )
    }
}
export default Homepage