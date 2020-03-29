import React, { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";

const APP_KEY = "1108a5453cb555813bf14a83f1b48749";
const APP_ID = "0b16b57f";

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const Req = await fetch(
      `https://api.edamam.com/search?q=${recipeName}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=21&calories=591-722&health=alcohol-free`
    );

    const data = await Req.json();
    this.setState({ recipes: data.hits });
    console.log(this.state.recipes);
  };
  componentDidMount = () => {
    const json = localStorage.getItem("recipes")
    const recipes = JSON.parse(json)
    this.setState({ recipes })
  }
componentDidUpdate = () => {
  const recipes = JSON.stringify(this.state.recipes);
  localStorage.setItem("recipes", recipes);
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>PATATA</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
