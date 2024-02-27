import React, { useEffect, useState } from 'react';
import "../Favourites/Favourites.css"
import Axios from "axios";
import ExercisingGif from "../../Images/Exercise.gif";
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";

const Favourites = () => {

    const [Cookie, setCookie] = useCookies(["auth_token"]); 
    const [isLoading, setIsLoading] = useState(true);
    const [ExerciseID, setExerciseID] = useState("")
    const [ExerciseID2, setExerciseID2] = useState("")
    const [ExerciseID3, setExerciseID3] = useState("")
    const [ExerciseID4, setExerciseID4] = useState("")
    const [ExerciseID5, setExerciseID5] = useState("")
    const [ExerciseID6, setExerciseID6] = useState("")
    const [Favourites, setFavourites] = useState([])
    const [Favourites2, setFavourites2] = useState([])
    const [Favourites3, setFavourites3] = useState([])
    const [Favourites4, setFavourites4] = useState([])
    const [Favourites5, setFavourites5] = useState([])
    const [Favourites6, setFavourites6] = useState([])
    const [FavouritesID, setFavouritesID] = useState("")
    const [FavouritesID2, setFavouritesID2] = useState("")
    const [FavouritesID3, setFavouritesID3] = useState("")
    const [FavouritesID4, setFavouritesID4] = useState("")
    const [FavouritesID5, setFavouritesID5] = useState("")
    const [FavouritesID6, setFavouritesID6] = useState("")
    const UserID = useGetUserID();

    useEffect(() => {

        const fetchExerciseID = async () => {
            try {
                await Axios.get(`https://better-health-server.onrender.com/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setExerciseID(response.data[0].ID)
                        setFavouritesID(response.data[0]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchExerciseID2 = async () => { 
            try {
                await Axios.get(`https://better-health-server.onrender.com/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setExerciseID2(response.data[1].ID)
                        setFavouritesID2(response.data[1]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchExerciseID3 = async () => {
            try {
                await Axios.get(`https://better-health-server.onrender.com/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setExerciseID3(response.data[2].ID)
                        setFavouritesID3(response.data[2]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchExerciseID4 = async () => {
            try {
                await Axios.get(`https://better-health-server.onrender.com/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setExerciseID4(response.data[3].ID)
                        setFavouritesID4(response.data[3]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchExerciseID5 = async () => {
            try {
                await Axios.get(`https://better-health-server.onrender.com/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setExerciseID5(response.data[4].ID)
                        setFavouritesID5(response.data[4]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        const fetchExerciseID6 = async () => {
            try {
                await Axios.get(`https://better-health-server.onrender.com/Favourites/${UserID}/Favourites`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((response) =>   {
                        setExerciseID6(response.data[5].ID)
                        setFavouritesID6(response.data[5]._id)
                })
            }
            catch (err) {
                console.log(err);
            }
        }

        if (UserID) {
            fetchExerciseID()
        } 
        
        if (UserID) {
            fetchExerciseID2()
        } 

        if (UserID) {
            fetchExerciseID3()
        } 

        if (UserID) {
            fetchExerciseID4()
        } 

        if (UserID) {
            fetchExerciseID5()
        } 

        if (UserID) {
            fetchExerciseID6()
        } 

    },[UserID])

    useEffect(()=> { 

        const fetchFavourites = () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ExerciseID}`;  
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }};

            try {
                fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setFavourites(data)
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
            })
            } catch (error) {
                console.error(error);
            }
        }

        if (ExerciseID) {
            fetchFavourites()
        } else {
            console.log("No Favourites")
        }

    },[ExerciseID]) 

    useEffect(()=> {  

        const fetchFavourites2 = () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ExerciseID2}`;  
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }};

            try {
                fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setFavourites2(data)
            })
            } catch (error) {
                console.error(error);
            }
        }


        if (ExerciseID2) {
            fetchFavourites2()
        } 

    },[ExerciseID2]) 

    useEffect(()=> {  

        const fetchFavourites3 = () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ExerciseID3}`;  
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }};

            try {
                fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setFavourites3(data)
            })
            } catch (error) {
                console.error(error);
            }
        }


        if (ExerciseID3) {
            fetchFavourites3()
        } 

    },[ExerciseID3]) 

    useEffect(()=> {  

        const fetchFavourites4 = () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ExerciseID4}`;  
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }};

            try {
                fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setFavourites4(data)
            })
            } catch (error) {
                console.error(error);
            }
        }

        if (ExerciseID4) {
            fetchFavourites4()
        } 

    },[ExerciseID4]) 


    useEffect(()=> {  

        const fetchFavourites5 = () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ExerciseID5}`;  
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }};

            try {
                fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setFavourites5(data)
            })
            } catch (error) {
                console.error(error);
            }
        }


        if (ExerciseID5) {
            fetchFavourites5()
        } 

    },[ExerciseID5])

    useEffect(()=> {  

        const fetchFavourites6 = () => {
            const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${ExerciseID6}`;  
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }};

            try {
                fetch(url, options)
                .then((response) => response.json())
                .then((data) => {
                    setFavourites6(data)
            })
            } catch (error) {
                console.error(error);
            }
        }


        if (ExerciseID6) {
            fetchFavourites6()
        } 

    },[ExerciseID6])
    
    const RemoveFromFavourites = (id) => {
        Axios.delete(`https://better-health-server.onrender.com/Favourites/${id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
        .then(
            window.location.reload()
        )
    }

return (
    <article> 
        <p className='Maximum'>Maximum number of favourites displayed is 6</p>
        <div className='Favourite'>
            {
            isLoading ? (
                <div className='Exercising' >
                    <img src={ExercisingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Favourites) ? ( 
                    <div key={Favourites.id} >
                        <Link className='Link' to={`/Workout/${Favourites.id}`} >
                            <article >
                                <img src={Favourites.gifUrl} alt="" />
                                <h2>{Favourites.name}</h2>
                                <div>
                                    { Favourites.target ? (<h3>Target Muscle: {Favourites.target}</h3>) : null }
                                    { Favourites.equipment ? (<h3>Equipment: {Favourites.equipment}</h3>) : null }
                                </div>
                            </article>
                        </Link>
                    {ExerciseID ?<button onClick={() => RemoveFromFavourites(FavouritesID)}>Remove from Favourites</button> : null }    
                    </div>
            ) : <h2 className='Failure'>No Favourites Found.</h2>
            )}
            {
            isLoading ? (
                <div className='Exercising' >
                    <img src={ExercisingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Favourites2) ? ( 
                <div key={Favourites2.id} >
                    <Link className='Link' to={`/Workout/${Favourites2.id}`} >
                        <article >
                            <img src={Favourites2.gifUrl} alt="" />
                            <h2>{Favourites2.name}</h2>
                            <div>
                                { Favourites2.target ? (<h3>Target Muscle: {Favourites2.target}</h3>) : null }
                                { Favourites2.equipment ? (<h3>Equipment: {Favourites2.equipment}</h3>) : null }
                            </div>
                        </article>
                    </Link>
                    { ExerciseID2 ? <button onClick={() => RemoveFromFavourites(FavouritesID2)}>Remove from Favourites</button> : null }
                    
                </div>
                    
            ) : ""
            )}
            {
            isLoading ? (
                <div className='Exercising' >
                    <img src={ExercisingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Favourites3) ? ( 
                    <div key={Favourites3.id} >
                        <Link className='Link' to={`/Workout/${Favourites3.id}`} >
                            <article >
                                <img src={Favourites3.gifUrl} alt="" />
                                <h2>{Favourites3.name}</h2>
                                <div>
                                    { Favourites3.target ? (<h3>Target Muscle: {Favourites3.target}</h3>) : null }
                                    { Favourites3.equipment ? (<h3>Equipment: {Favourites3.equipment}</h3>) : null }
                                </div>
                            </article>
                        </Link>
                        { ExerciseID3 ? <button onClick={() => RemoveFromFavourites(FavouritesID3)}>Remove from Favourites</button> : null
                        }
                    </div>
                    
            ) : ""
            )}
            {
            isLoading ? (
                <div className='Exercising' >
                    <img src={ExercisingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Favourites4) ? ( 
                    <div key={Favourites4.id} >
                        <Link className='Link' to={`/Workout/${Favourites4.id}`} >
                            <article >
                                <img src={Favourites4.gifUrl} alt="" />
                                <h2>{Favourites4.name}</h2>
                                <div>
                                { Favourites4.target ? (<h3>Target Muscle: {Favourites4.target}</h3>) : null }
                                { Favourites4.equipment ? (<h3>Equipment: {Favourites4.equipment}</h3>) : null }
                                </div>
                            </article>
                        </Link>
                        { ExerciseID4 ? <button onClick={() => RemoveFromFavourites(FavouritesID4)}>Remove from Favourites</button> : null
                        }
                    </div>
                    
            ) : ""
            )}
            {
            isLoading ? (
                <div className='Exercising' >
                    <img src={ExercisingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Favourites5) ? ( 
                    <div key={Favourites5.id} >
                        <Link className='Link' to={`/Workout/${Favourites5.id}`} >
                            <article >
                                <img src={Favourites5.gifUrl} alt="" />
                                <h2>{Favourites5.name}</h2>
                                <div>
                                { Favourites5.target ? (<h3>Target Muscle: {Favourites5.target}</h3>) : null }
                                { Favourites5.equipment ? (<h3>Equipment: {Favourites5.equipment}</h3>) : null }
                                </div>
                            </article>
                        </Link>
                        { ExerciseID5 ? <button onClick={() => RemoveFromFavourites(FavouritesID5)}>Remove from Favourites</button> : null
                        }
                    </div>
                    
            ) : ""
            )}
            {
            isLoading ? (
                <div className='Exercising' >
                    <img src={ExercisingGif} alt="Loading..." className='Loading' />
                </div>
            ) : (
            (Favourites6) ? ( 
                <div key={Favourites6.id} >
                    <Link className='Link' to={`/Workout/${Favourites6.id}`} >
                        <article >
                            <img src={Favourites6.gifUrl} alt="" />
                            <h2>{Favourites6.name}</h2>
                            <div>
                                { Favourites6.target ? (<h3>Target Muscle: {Favourites6.target}</h3>) : null }
                                { Favourites6.equipment ? (<h3>Equipment: {Favourites6.equipment}</h3>) : null }
                            </div>
                        </article>
                    </Link>
                    { ExerciseID6 ? <button onClick={() => RemoveFromFavourites(FavouritesID6)}>Remove from Favourites</button> : null
                    }
                </div>
            ) : ""
            )}
        </div>
    </article>
    
)
}

export default Favourites 