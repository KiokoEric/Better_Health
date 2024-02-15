import React, { useEffect, useState } from 'react';
import "../Nutrition/Nutrition.css";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Nutrition = () => {

    const NutritionState = () => {
        let Nutrition = localStorage.getItem("Nutrition");

        if (Nutrition === "") {
            return []
        } else {
            return JSON.parse(localStorage.getItem("Nutrition"))
        }
    }

    const [Nutritions, setNutritions] = useState(NutritionState())
    const [Label, setLabel] = useState([])
    const [Videos, setVideos] = useState([])
    const [Search, setSearch] = useState("")
    const[SearchError, setSearchError] = useState("")

    const handleSearch = (e) => {
        setSearch(e.target.value) 
    }

    const getRecipe = async (e) => { 
        e.preventDefault()

        if(Search === "") {
            setSearchError("Kindly enter a search item.")
        } else {
            const url = `https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=${Search}`;
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '244993a79dmsh0fa01b82b28a5dbp1cdc42jsnf77dcbc9e24c',
                'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setSearchError("")
            setNutritions(data.hits)
            setLabel(data.hits.recipe)
        } catch (error) {
            console.error(error);
        }
        }
    }

    useEffect(() => {
        localStorage.setItem("Nutrition", JSON.stringify(Nutritions))
    },[Nutritions]);

return (
    <div>
        <section  className='Nutrition'  >
            <h1>Search your desired dish ?</h1>
            <form onSubmit={getRecipe} >
                <i id='Utensils' class="fa-solid fa-utensils"></i>
                <input type="text" placeholder="Search your dish..." value={Search} onChange={handleSearch} />
                <i onClick={getRecipe} id='Search' class="fa-solid fa-magnifying-glass"></i>
            </form>
            <span>{SearchError}</span>
            <p>Let food be thy medicine and medicine be thy food.</p>
        </section>
        <section>
            {
            (!Nutritions) ? <h2 className='MyFailure'>No Results Found</h2> :
            Nutritions.map((Nutrition) => {
            return (
                    <div className='Instruction' >
                        <figure>
                            <div>
                                <img src={Nutrition.recipe.image} alt="" />
                                <a href={Nutrition.recipe.url} target='_blank' rel='noreferrer'>
                                    <p>Recipe Instructions</p><i class="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                            </div>
                            <figcaption>
                                <h2>{Nutrition.recipe.label} <span>({Nutrition.recipe.cuisineType})</span> </h2>
                                <h3>Calories : {Nutrition.recipe.calories.toFixed(2)}</h3>
                                <h4>Ingredients</h4>
                                <div>
                                    <ul>
                                        {Nutrition.recipe.ingredientLines[0]? (<li>{Nutrition.recipe.ingredientLines[0]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[1]? (<li>{Nutrition.recipe.ingredientLines[1]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[2]? (<li>{Nutrition.recipe.ingredientLines[2]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[3]? (<li>{Nutrition.recipe.ingredientLines[3]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[4]? (<li>{Nutrition.recipe.ingredientLines[4]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[5]? (<li>{Nutrition.recipe.ingredientLines[5]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[6]? (<li>{Nutrition.recipe.ingredientLines[6]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[7]? (<li>{Nutrition.recipe.ingredientLines[7]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[8]? (<li>{Nutrition.recipe.ingredientLines[8]}</li>): null}
                                    </ul>
                                    <ul>
                                    {Nutrition.recipe.ingredientLines[9]? (<li>{Nutrition.recipe.ingredientLines[9]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[10]? (<li>{Nutrition.recipe.ingredientLines[10]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[11]? (<li>{Nutrition.recipe.ingredientLines[11]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[12]? (<li>{Nutrition.recipe.ingredientLines[12]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[13]? (<li>{Nutrition.recipe.ingredientLines[13]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[14]? (<li>{Nutrition.recipe.ingredientLines[14]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[15]? (<li>{Nutrition.recipe.ingredientLines[15]}</li>): null}
                                        {Nutrition.recipe.ingredientLines[16]? (<li>{Nutrition.recipe.ingredientLines[16]}</li>): null}
                                    </ul>
                                </div>
                                <div>
                                    <section>
                                        {<li>{Nutrition.recipe.totalNutrients.CA.label}</li>}
                                        {<li>{Nutrition.recipe.totalNutrients.CA.quantity.toFixed(2)}</li>}
                                    </section>
                                    <section>
                                        {<li>{Nutrition.recipe.totalNutrients.FE.label}</li>}
                                        {<li>{Nutrition.recipe.totalNutrients.FE.quantity.toFixed(2)}</li>}
                                    </section>
                                    <section>
                                        {<li>{Nutrition.recipe.totalNutrients.MG.label}</li>}
                                        {<li>{Nutrition.recipe.totalNutrients.MG.quantity.toFixed(2)}</li>}
                                    </section>
                                    <section>
                                        {<li>{Nutrition.recipe.totalNutrients.ZN.label}</li>}
                                        {<li>{Nutrition.recipe.totalNutrients.ZN.quantity.toFixed(2)}</li>}
                                    </section>
                                    <section>
                                        {<li>{Nutrition.recipe.totalNutrients.NA.label}</li>}
                                        {<li>{Nutrition.recipe.totalNutrients.NA.quantity.toFixed(2)}</li>}
                                    </section>
                                    <section>
                                        {<li>{Nutrition.recipe.totalNutrients.K.label}</li>}
                                        {<li>{Nutrition.recipe.totalNutrients.K.quantity.toFixed(2)}</li>}
                                    </section>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
            )
            })} 
        </section>
    </div>  
)
}

export default Nutrition

