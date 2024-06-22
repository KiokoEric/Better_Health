import React, { useState, useEffect } from 'react';
import "../Exercise/Exercise.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";

const Exercise = () => {

    const ExerciseState = () => {
        let Value = localStorage.getItem("Values");

        if (Value === "") {
            return []
        } else {
            return JSON.parse(localStorage.getItem("Values"))
        }
    }

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]); 
    const [Favourites, setFavourites] = useState([]);
    const [userOwner, setuserOwner] = useState(UserID)
    const [Search,setSearch] = useState("")
    const [SearchError, setSearchError] = useState([])
    const [Exercises, setExercises] = useState(ExerciseState())

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase())
    }

    const SearchExercise = async (e) => {
        e.preventDefault()

        if(Search === "") {
            setSearchError("Kindly select one of the options above.")
        } else {
            const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back';
            const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
	        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result)
            setExercises(result)
            setSearchError("")
        } catch (error) {
            console.error(error);
        }
        }
    }

    const AddToFavourites = async (ID) => {
        const data = {
            ID, userOwner
        }
        try {
        await Axios.post("https://better-health-server.onrender.com/Favourites/AddFavourite", data, {
            headers: { authorization: Cookie.auth_token },
        });
        setFavourites(data.Favourites);
    } catch (err) {
        console.log(err);
    }
    };

    useEffect(() => {
        localStorage.setItem("Values", JSON.stringify(Exercises))
    },[Exercises]);

    const handleCopy = (id) => {
        navigator.clipboard.writeText(id)
    };


return (
    <div className='Exercise' >
        <section>
            <h1>Search your body part</h1>
            <form onSubmit={SearchExercise}>
                <select name="" id="Select" value={Search} onChange={handleSearch} >
                    <option value="">Search among the bodyparts below</option>
                    <option value="back">Back</option>
                    <option value="cardio">Cardio</option>
                    <option value="chest">Chest</option>
                    <option value="lower arms">Lower Arms</option>
                    <option value="lower legs">Lower Legs</option>
                    <option value="neck">Neck</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="upper arms">Upper Arms</option>
                    <option value="upper legs">Upper Legs</option>
                    <option value="waist">Waist</option>
                </select>
                <button onClick={SearchExercise} type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                <span>{SearchError}</span>
                <p>The secret of getting ahead is getting started.</p>
            </form>
        </section>
        <section>
        {
            (!Exercises) ? <h2 className='Failure' >No Results Found</h2> :
            Exercises.map((Exercise) => {
                return(
                    <div key={Exercise.id} >
                        <Link className='Link' to={`/Workout/${Exercise.id}`} >
                            <figure className='ExerciseOptions' >
                                <img src={Exercise.gifUrl} alt="" />
                                <h2>{Exercise.name}</h2>
                                <div>
                                    <h3>Target Muscle: {Exercise.target}</h3>
                                    <h3>Equipment: {Exercise.equipment}</h3> 
                                </div>
                            </figure> 
                        </Link>
                        <article>
                            <button className='Bookmark' onClick={() => AddToFavourites(Exercise.id)}><i class="fa-solid fa-bookmark"></i></button>
                            <button className='Copy'  onClick={() => handleCopy(Exercise.id)}><i class="fa-solid fa-copy"></i></button>
                        </article>
                    </div>
                )
            })
        }
        </section>
    </div>
)
}

export default Exercise