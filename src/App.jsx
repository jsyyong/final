import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Homepage from './Homepage.jsx'
import Recipes from './Recipes.jsx'
import Favorites from './Favorites.jsx'

class App extends Component {

renderHomepage = () => {
    return (
        <Homepage />
    )
}

renderRecipe = () => {
    return (
        <Recipes />
    )
}

renderFavorites = () => {
    return (
        <Favorites />
    )
}

    render = () => {
        return (
            <BrowserRouter>
            <Route exact={true} path='/' render={this.renderHomepage} /> {/*renders the main home screen*/}
            <Route exact={true} path='/recipes' render={this.renderRecipe} />
            <Route exact={true} path='/favorites' render={this.renderFavorites} />
            </BrowserRouter>
        )
    }
}


export default App
