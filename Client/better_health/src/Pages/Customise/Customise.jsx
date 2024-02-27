import React, { useState, useEffect } from 'react';
import "../Customise/Customise.css";
import Axios from "axios";
import { useSnackbar } from 'notistack';
import { useGetUserID } from "../../Components/Hooks/UseGetUserID";
import { useCookies } from "react-cookie";

const Customise = () => {

    const NameState = () => {
        let Names = localStorage.getItem("Name");

        if (Names) {
            return JSON.parse(localStorage.getItem("Name"))
        } else {
            return [];
        }
    }

    const MuscleState = () => {
        let Muscle = localStorage.getItem("Muscle");

        if (Muscle) {
            return JSON.parse(localStorage.getItem("Muscle"))
        } else {
            return [];
        }
    }

    const CategoryState = () => {
        let Category = localStorage.getItem("Category");

        if (Category) {
            return JSON.parse(localStorage.getItem("Category"))
        } else {
            return [];
        }
    }

    const InstructionState = () => {
        let Instruction = localStorage.getItem("Instructions");

        if (Instruction) {
            return JSON.parse(localStorage.getItem("Instructions"))
        } else {
            return [];
        }
    }

    const ImageState = () => {
        let Image = localStorage.getItem("Images");

        if (Image) {
            return JSON.parse(localStorage.getItem("Images"))
        } else {
            return [];
        }
    }

    const UserID = useGetUserID();

    const [Cookie, setCookie] = useCookies(["auth_token"]);
    const [Name, setName] = useState(NameState())
    const [Muscle, setMuscle] = useState(MuscleState())
    const [Category, setCategory] = useState(CategoryState())
    const [Instructions, setInstructions] = useState(InstructionState())
    const [Image, setImage] = useState(ImageState())
    const [Error, setError] = useState("")
    const [FieldError, setFieldError] = useState("")
    const [userOwner, setuserOwner] = useState(UserID)
    const { enqueueSnackbar } = useSnackbar();

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

    const createWorkout = async (e) => {
        e.preventDefault()

        if (!UserID) {
            setError('Kindly log in!') 
        }
        else if (Name === "") {
            setFieldError("Name, Muscle, Category, Instructions and Image Fileds are required")
        } else if (Muscle === "") {
            setFieldError("Name, Muscle, Category, Instructions and Image Fileds are required")
        } else if (Category === "") {
            setFieldError("Name, Muscle, Category, Instructions and Image Fields are required")
        } else if (Instructions == "") {
            setFieldError("Name, Muscle, Category, Instructions and Image Fields are required")
        } else if (Image === "") {
            setFieldError("Name, Muscle, Category, Instructions and Image Fields are required")
        } else {
            const data = {
                Name, Muscle, Category, Instructions, Image, userOwner
            }
            try {
                Axios.post("https://better-health-server.onrender.com/Exercise/AddWorkout", data , {
                    headers: { authorization: Cookie.auth_token }
                }) 
                .then(() => { 
                    enqueueSnackbar("Workout successfully added!", {variant: "success"})
                    setName('')
                    setMuscle('')
                    setCategory('')
                    setInstructions('')
                    setImage('')
                })
            } catch (error) {
                console.error(error) 
            }
        }
    }  

    useEffect(() => {
        localStorage.setItem("Name", JSON.stringify(Name))
    },[Name]);

    useEffect(() => {
        localStorage.setItem("Muscle", JSON.stringify(Muscle))
    },[Muscle]);

    useEffect(() => {
        localStorage.setItem("Category", JSON.stringify(Category))
    },[Category]);

    useEffect(() => {
        localStorage.setItem("Instructions", JSON.stringify(Instructions))
    },[Instructions]);

    useEffect(() => {
        localStorage.setItem("Images", JSON.stringify(Image))
    },[Image]);

return (
    <div className='Customise' >
        <section>
            <h1>Create Workout</h1>
        </section>
        <section>
            <form onSubmit={createWorkout} method="post" encType="multipart/form-data" >
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
                    <label for="">Exercise Image <b>(Copy Exercise Image Link from Exercise Section)</b> </label>
                    <input type="text" name="Image" id="Image" placeholder='Enter Image Link...' value={Image} onChange={handleImage} required />
                </div>
                <div>
                    <h4 className='Errors'>{Error}</h4>
                    <span className='Errors'>{FieldError}</span>
                    <button onClick={createWorkout} type="submit">Create Workout</button>
                </div>
            </form>
        </section> 
    </div>
)
}

export default Customise 