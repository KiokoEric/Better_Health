import React, { useEffect } from 'react';
import "../Profile/Profile.css";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../../../Components/Hooks/UseGetUserID";
import {useNavigate, useParams} from "react-router-dom";
import { useState } from 'react';

const Profile = () => { 

    const [ Cookie, setCookie ] = useCookies(["auth_token"]);
    const [showPassword, setShowPassword] = useState(false);
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Error, setError] = useState("")
    const { userID } = useParams()
    const [Success, setSuccess] = useState("")

    const ID = useGetUserID();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate()

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {

        const FetchUser =() => {
        try{
            Axios.get(`http://localhost:4000/Users/${userID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Data) => { 
                setName(Data.data.Name)
                setEmail(Data.data.Email)
                setPassword(Data.data.Password)
            })
        }
        catch (Error){
            console.log(Error)
        }
        }

        if(ID) {
            FetchUser()
        }
        
    }, [ID])

    const EditUser = () => {
        navigate(`/MyProfile/${userID}`)
    } 

    const DeleteUser = (id) => {
        navigate(`/DeleteProfile`)
    }

return (
    <div className='Profile'>
        <section>
            <h1>Profile</h1>
        </section>
        <section>
            {
            ID ? 
            <form onSubmit={EditUser} method="post" encType="multipart/form-data">
                <div>
                    <label for="">Name</label>
                    <input type="text" name="Name" id="Name" placeholder="Enter Name..." value={Name}  onChange={handleName} readOnly />
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="email" name="Email" id="Email" placeholder="Enter Email..." value={Email} onChange={handleEmail} readOnly />
                </div>
                <div>
                    <label for="">Password</label>
                    <article>
                        <input  type={showPassword ? 'text' : 'password'} name="Password" id="myPassword" placeholder="Enter Password..." value={Password} onChange={handlePassword} readOnly />
                        {showPassword ? <i onClick={handleTogglePassword} id='Eye' class="fa-solid  fa-eye"></i> : <i id='Eye' onClick={handleTogglePassword} class="fa-solid fa-eye-slash"></i> }
                    </article>
                </div>
                <h4 className='Success' >{Success}</h4>
                <div>
                    <button onClick={EditUser} type="submit"><i class="fa-solid fa-pen-to-square"></i>Edit Details</button>
                    <button onClick={DeleteUser}><i class="fa-solid fa-trash"></i>Delete My Profile</button>
                </div>
            </form> : <h1 className='LoginError' >Kindly Login!</h1>
            }
        </section> 
    </div>
)
}

export default Profile 