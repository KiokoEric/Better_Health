import React, { useState, useEffect } from 'react';
import "../Customise/Customise.css";
import Axios from "axios";
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';

const Edit = () => {

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Name, setName] = useState("")
    const [Muscle, setMuscle] = useState("")
    const [Category, setCategory] = useState([])
    const [Instructions, setInstructions] = useState([])
    const [Image, setImage] = useState("")
    const [Success, setSuccess] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const { _id } = useParams()

    useEffect(() => {
        Axios.get(`https://better-health-server.onrender.com/Exercise/MyWorkouts/${_id}`, {
                headers: { authorization: Cookie.auth_token },
            }) 
        .then((Data) => { 
            setName(Data.data.Name)
            setCategory(Data.data.Category)
            setMuscle(Data.data.Muscle)
            setInstructions(Data.data.Instructions)
            setImage(Data.data.Image) 
        })
    }, [])

    const EditWorkout = async (e) => {
        e.preventDefault()

        const data = {
            Name, Muscle, Category, Instructions, Image, userOwner
        }
        try {
            Axios.put(`https://better-health-server.onrender.com/Exercise/${_id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Workout successfully Edited.")
            })
        } catch (error) {
            console.error(error) 
        }
        
    }  


    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleMuscle = (e) => {
        setMuscle(e.target.value)
    }

    const handleInstructions = (e) => {
        setInstructions(e.target.value)
    }

    const handleImage = (e) => {
        setImage(e.target.value)
    }


return (
    <div className='Customise' >
        <section>
            <h1>Edit Workout</h1>
        </section>
        <section>
            <form onSubmit={EditWorkout} method="post" encType="multipart/form-data" >
                <div>
                    <label for="">Name</label> 
                    <input type="text" name="Subject" id="Subject" placeholder="Enter Name..." value={Name} onChange={handleName} required />
                </div>
                <div>
                    <label for="">Muscle</label>
                    <select name="" id="Select" value={Muscle} onChange={handleMuscle} >
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
                </div>
                <div>
                    <label for="">Instructions</label>
                    <textarea type="text" name="" id="Ingredients" cols="30" rows="10" placeholder='Enter Instructions'  value={Instructions} onChange={handleInstructions} required ></textarea>
                </div>
                <div>
                    <label for="">Category</label>
                    <select name="" id="Select" value={Category} onChange={handleCategory}>
                        <option value="">Search among the categories below</option>
                        <option value="Weight and Reps">Weight and Reps</option>
                        <option value="Reps">Reps</option>
                        <option value="Distance and Time">Distance and Time</option>
                        <option value="Time">Time</option>
                    </select>
                </div>
                <div>
                    <label for="">Exercise Image</label>
                    <input type="text" name="Image" id="Image" placeholder='Enter Image Link...' value={Image} onChange={handleImage} required />
                </div>
                <div>
                    <h4 className='Success' >{Success}</h4>
                    <button onClick={EditWorkout} type="submit">Edit Workout</button>
                </div>
            </form>
        </section> 
    </div>
)
}

export default Edit