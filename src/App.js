import React, { useEffect, useState } from "react";
import "./thecss/Recipe.css";
import "./thecss/recipe.module.css";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  const APP_ID = "12e3bacd";
  const APP_KEY = "9ede987946f451e821401a575e67980a";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    };
const updateSearch = e => {setSearch(e.target.value);};

const getSearch = e => {e.preventDefault(); setQuery(search);}


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
};

export default App;
