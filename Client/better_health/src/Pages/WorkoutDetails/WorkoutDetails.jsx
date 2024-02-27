import React, { useEffect, useState } from 'react';
import "../WorkoutDetails/WorkoutDetails.css";
import Axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";


const WorkoutDetails = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Exercises, setExercises] = useState([])
    const [Workouts, setWorkouts] = useState([])
    const [WorkoutName, setWorkoutName] = useState("")
    const [WorkoutImages, setWorkoutImages] = useState("")
    const [Videos, setVideos] = useState([])
    const { _id } = useParams();

    const userID = useGetUserID();

    useEffect(() => {

    const fetchExercise = async () => {
        Axios.get(`https://better-health-server.onrender.com/Exercise/MyWorkouts/${_id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Data) => {
            setExercises(Data.data)
            setWorkouts(Data.data.Image)
        })
    }

    if (userID) {
        fetchExercise()
    }
    
    },[userID])

    useEffect(() => {

        const fetchImage = async () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${Workouts}`;
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
            };
    
            try {
                await fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setWorkoutName(data.name)
                    setWorkoutImages(data.gifUrl)
            })
            } catch (error) {
                console.error(error);
            }
        }

        fetchImage()
        
    }, [Exercises])

    let Link = WorkoutName

    useEffect(() => {

        const YouTube = async () => {

            const url = `https://youtube-search-and-download.p.rapidapi.com/search?query=${Link}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
                }
            };
    
            try {
                fetch(url, options)
                .then (response => response.json()) 
                .then((data) => {
                    setVideos(data.contents)
                })
            } catch (error) {
                console.error(error);
            }
        }

        if(WorkoutName){
            YouTube()
        }

    }, [WorkoutName])


return (
    <div className='WorkoutDetails'>
        <section>
            <figure key={Exercises.Name} >
                <img src={WorkoutImages} alt="" />
                <figcaption>
                    <h1>{Exercises.Name} (<span>{Exercises.Category}</span>) </h1>
                    <h2>Target Muscle: {Exercises.Muscle}</h2>
                    <h3>Instructions</h3>
                    <li>{Exercises.Instructions}</li>
                </figcaption>
            </figure>
        </section>
        <h2>YouTube Videos</h2>
        <section>
            {Videos ? (
                Videos?.slice(0,3).map((Video) => {
                    let ExerciseLink = Video.video.videoId  
                    return(
                        <a href={`https://www.youtube.com/watch?v=${ExerciseLink}`} target='_blank' rel='noreferrer' className='Youtube'>
                            <img src={Video.video.thumbnails[0].url} alt="" />
                            <h3>{Video.title}</h3>   
                        </a>
                    )
                })
            ) : (
                <h2 className='Failure' >No Results Found</h2> 
            )
            }
        </section>
    </div>
)
}

export default WorkoutDetails
