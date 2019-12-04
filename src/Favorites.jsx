import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
class Favorites extends Component {
    render = () => {
        console.log("inside faorites")
        return (
            <div>
                <NavBar />
                Welcome to the Favorites page!!
            </div>
        )
    }
}
export default Favorites