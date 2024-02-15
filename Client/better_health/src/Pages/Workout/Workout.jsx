import React, { useEffect, useState } from 'react';
import "../Workout/Workout.css";
import Axios from "axios";
import loadingGif from "../../Images/Exercising.gif";
import WorkoutImages  from "../../Images/Workout.jpg";
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";

const Workout = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [isLoading, setIsLoading] = useState(true);
    const [Exercises, setExercises] = useState([])

    const userID = useGetUserID();

    useEffect(() => {

    const fetchExercise = async () => {
        Axios.get(`http://localhost:4000/Exercise/${userID}/Workout`, { 
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Data) => {
            setExercises(Data.data)
        })
        setTimeout(() => {
            setIsLoading(false); 
        }, 1000);
    }

        if (userID) {
            fetchExercise()
        }
    
    },[userID])

    // Delete Workout

    const handleDelete= (_id) => {
        Axios.delete(`http://localhost:4000/Exercise/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
        .then(
            window.location.reload()
        )
    }


return (
    <div className='MyWorkout' >
        <section>
            <h1>My Workout</h1>
        </section>
        <section>
            {isLoading ? (
                <div className='Gif' >
                    <img src={loadingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
                (Exercises.length > 0) ?  
                Exercises.map((Exercise) => {
                return (
                    <Link to={`/WorkoutDetails/${Exercise._id}`} className='WorkoutLink' key={Exercise.Name} >
                        <img src={WorkoutImages} alt="" width="350px" />
                        <div>
                            <Link to={`/Edit/${Exercise._id}`} key={Exercise._id} >
                                <i id='Edit' class="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <i id='Delete' onClick={() => handleDelete(Exercise._id)} class="fa-solid fa-trash"></i>
                        </div>
                        <h1>{Exercise.Name} (<span>{Exercise.Category}</span>) </h1>
                    </Link>
                )
                }) : <h2 className='NoWorkout'>No Workouts Found.</h2> 
            )
            }
        </section>
    </div> 
)
}

export default Workout
