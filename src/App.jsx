import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Homepage from './Homepage.jsx'
import Recipe from './Recipe.jsx'

class App extends Component {

renderHomepage = () => {
    return (
        <Homepage />
    )
}

renderRecipe = () => {
    return (
        <Recipe />
    )
}

    render = () => {
        return (
            <BrowserRouter>
            <Route exact={true} path='/' render={this.renderHomepage} /> {/*renders the main home screen*/}
            <Route exact={true} path='/recipe' render={this.renderRecipe} />
            </BrowserRouter>
        )
    }
}


export default App
