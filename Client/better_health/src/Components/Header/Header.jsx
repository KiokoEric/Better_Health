import React, { useEffect, useState } from 'react';
import "../Header/Header.css";
import Axios from "axios";
import Header_Logo from "../../Images/Header_Logo.webp";
import { useGetUserID } from "../Hooks/UseGetUserID";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Header = () => {

    const [Name, setName] = useState("")
    const [ExtendNavbar,setExtendNavbar ] = useState(true) 
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    const userID = useGetUserID();

    const navigate = useNavigate();

    useEffect(() => {
        
        const FetchName  = async() => {
            await Axios.get(`http://localhost:4000/Users/${userID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        if (userID) {
            FetchName()
        } 

    },[userID])

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <div className='Header' >
        <section>
            <Link to="/Home" className='Logo' >
                <figure>
                    <img src={Header_Logo} alt="" width="45px" />
                    <figcaption>
                        <h1 className='Title'>Better Health</h1>
                    </figcaption>
                </figure>
            </Link>
        </section>
        <section>
            <nav className={ExtendNavbar ? "CloseNavigation" : "OpenNavigation" } onClick={() => setExtendNavbar(false)} > 
                <Link to="/Home" className='Link Navigation'>Home</Link> 
                <Link to="/Exercise" className='Link Navigation'>Exercise</Link>
                <Link to="/Nutrition" className='Link Navigation'>Nutrition</Link>
                <Link to="/Fitness_Calculator" className='Link Navigation'>Fitness Calculator</Link>
                <Link Link to="/Customise" className='Link Navigation Hidden'> <p>Customise Workout</p></Link>
                <Link to="/Workout" className='Link Navigation'>My Workout</Link>
                <Link to="/Favourites" id='Favourites' className='Link Navigation'>Favourites</Link>
                {
                    !userID ? <Link Link to="/Registration" className='Link Navigation Hidden'> <p>Sign Up</p></Link> : null
                }
                
                {
                    !Cookie.auth_token ?
                    (
                        <Link to="/" className='Link Navigation Hidden' >
                            <p>Login</p>
                        </Link>
                    ) : 
                    (
                        <p onClick={Logout} type="submit" className='Link Navigation Hidden' >Logout</p>
                    )
                }
            </nav>
        </section>
        <section>
            <figure onClick={()=> {setExtendNavbar((curr) => !curr)}}>
                {ExtendNavbar ?    <i  id="Bars" class="fa-solid fa-bars"></i> : <i id='Bars' class="fa-solid fa-xmark"></i> }
            </figure>
            <Link  to="/Customise" className='Workout' >
                <button className="Customise-Hover" > <i class="fa-solid fa-file-pen"></i></button>
            </Link>
            <Link to="/Favourites" className='Workout'>
                <button className="Favourites-Hover" ><i class="fa-solid fa-bookmark"></i></button>
            </Link>
            {
                !userID ? <Link to="/Registration" className='User'>
                    <button type="submit">Sign Up</button>
                </Link> : null
            }
            {
                !Cookie.auth_token ?
                (
                    <Link to="/" className='User' >
                        <button type="submit">Login</button>
                    </Link>
                ) : 
                (
                    <button onClick={Logout} type="submit" className='Logout'>Logout</button>
                )
            }
            <Link to={`Profile/${userID}`} >
                <i id='Profile' class="fa-solid fa-user"></i>
            </Link>
            {userID ? <h4> <span>Welcome</span> {Name}</h4> : null }
        </section>
    </div>
)
}

export default Header 