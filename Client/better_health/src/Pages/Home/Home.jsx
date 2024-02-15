import React from 'react';
import "../Home/Home.css";
import Fitness_Image  from "../../Images/Fitness_Home_Image.jpg" 
import { Link } from 'react-router-dom';

const Home = () => {
return (
    <div className='Home' >
        <section>
            <h1>Exercise is king. Nutrition is queen. Put them together and you’ve got a kingdom.</h1>
            <p>
                Better Health is an online platform looking to provide online fitness and nutrition resources to its members as they pursue their goal of better health. Through the use of various exercise and nutrition resources we look to help our members to both start as well as continue on a path of continuous body fitness.
            </p>
            <h4>Please feel free to explore our available resources below.</h4>
            <div>
                <button>
                    <Link to="/Exercise" className='Navigate'>Exercise</Link> 
                </button>
                <button>
                    <Link to="/Nutrition" className='Navigate'>Nutrition</Link>
                </button>
                <button>
                    <Link to="/Fitness_Calculator" className='Navigate'>Fitness Calculator</Link>
                </button>
                <button>
                    <Link to="/Workout" className='Navigate'>My Workout</Link>
                </button>
            </div>
        </section>
        <section>
            <figure>
                <img src={Fitness_Image} alt="" />
            </figure>
        </section>
    </div>
)
}

export default Home