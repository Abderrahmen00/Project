import React from "react";
import { Link } from "react-router-dom";

const APP_KEY = "1108a5453cb555813bf14a83f1b48749";
const APP_ID = "0b16b57f";

class Recipe extends React.Component {
  state = {
    activeRecipe: []
  };

  componentDidMount = async () => {
    const title = this.props.location.state.recipe;
    const api_call = await fetch(
      `https://api.edamam.com/search?q=${title}&app_id=${APP_ID}&app_key=${APP_KEY}&`
    );

    const res = await api_call.json();
    this.setState({ activeRecipe: res.hits[0].recipe });
    console.log(this.state.activeRecipe);
  };

  render() {
    const recipe = this.state.activeRecipe;
    return (
      <div className="container">
        {this.state.activeRecipe.length !== 0 && (
          <div className="active-recipe">
            <img
              className="active-recipe__img"
              src={recipe.image}
              alt={recipe.label}
            />
            <h3 className="active-recipe__title">{recipe.label}</h3>
            <h4 className="active-recipe__publisher">
              Source : <span>{recipe.source}</span>
            </h4>
            <p className="active-recipe__website">
              Website :{" "}
              <span>
                <a href={recipe.url}>{recipe.url} </a>
              </span>
            </p>
            <button className="active-recipe__button"><Link to="/">Go Home</Link></button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;
