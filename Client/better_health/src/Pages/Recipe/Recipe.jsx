import React, { useState, useEffect } from 'react';
import "../Recipe/Recipe.css";
import { Link } from 'react-router-dom';

const Recipe = () => {

    const SearchState = () => {
        let Value = localStorage.getItem("Values");

        if (Value === "") {
            return []
        } else {
            return JSON.parse(localStorage.getItem("Values"))
        }
    }

    const [Recipes, setRecipes] = useState(SearchState())
    const [Search, setSearch] = useState("")
    const [SearchError, setSearchError] = useState("")

    const getRecipe = (e) => { 
        e.preventDefault()
        if(Search === "") {
            setSearchError("Kindly enter a search item.")
        } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Search}`)
        .then(response => response.json())
        .then((data) => {
            setSearchError("")
            setRecipes(data.meals)
            setSearch("")
        })
        .catch(err => console.error(err));
    }
    }
    
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem("Values", JSON.stringify(Recipes))
    },[Recipes]); 


return (
    <div className='Recipe'> 
        <section className='SearchPage' >
            <h1>Your desired dish ?</h1>
            <form onSubmit={getRecipe} >
                <i id='Utensils' class="fa-solid fa-utensils"></i>
                <input type="text" placeholder="Search recipes..." value={Search} onChange={handleSearch} />
                <i onClick={getRecipe} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form>
            <span>{SearchError}</span>
            <p>Search any recipe e.g fish, chicken</p> 
        </section>
        <section className='SearchResults'>
            { 
            (!Recipes) ? <h2 className='Failure' >No Results Found</h2> :
            Recipes.map((Recipe) => {
            return (
                <div key={Recipe.id} >
                    <section>
                        <Link className='Link' to={`/Meal/${Recipe.idMeal}`} key={Recipe.idMeal} >
                            <figure>
                                <img src={Recipe.strMealThumb} alt="" />
                                <figcaption>
                                    <h2>{Recipe.strMeal}</h2>
                                </figcaption>
                            </figure>
                        </Link>
                    </section>
                </div>
            )
            })} 
        </section>
    </div>
)
}

export default Recipe