import React, { Component } from 'react'
import NavBar from './NavBar.jsx'
class Recipes extends Component {
    render = () => {
        console.log("inside recpie")
        return (
            <div>
                <NavBar />
                Welcome to the recipe page!
            </div>
        )
    }
}
export default Recipes