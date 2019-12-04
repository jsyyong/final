import React, { Component } from 'react'
import { Link } from "react-router-dom";
import NavBar from './NavBar.jsx'
class Homepage extends Component {
    render = () => {
        return (
            <div className='containerAll'>
                <NavBar />
                Welcome to my site!
            </div>
            
        )
    }
}
export default Homepage