import React, { useState } from 'react';
import "../Fitness/Fitness.css"

const Fitness = () => {

    const[Height, setHeight] = useState("")
    const[Weight, setWeight] = useState("")
    const[Activity, setActivity] = useState("")
    const[Pounds, setPounds] = useState("")
    const[Minutes, setMinutes] = useState("")
    const[Calories, setCalories] = useState([])
    const[Items, setItems]= useState([])
    const[BMIError, setBMIError] = useState("")
    const[CaloriesError, setCaloriesError] = useState("")

    const handleHeight = (e) => {
        setHeight(e.target.value)
    }

    const handleWeight = (e) => {
        setWeight(e.target.value)
    }

    const handleActivity = (e) => {
        setActivity(e.target.value)
    }

    const handleMinutes = (e) => {
        setMinutes(e.target.value)
    }

    const handlePounds = (e) => {
        setPounds(e.target.value)
    }

    const BMICalculator = async () => {
        if (Height === "" && Weight === ""){
            setBMIError("Kindly enter your height and weight.")
        } else {
            const url = `https://bmi-calculator6.p.rapidapi.com/bmi?height=${Height}&weight=${Weight}&system=metric`;
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5900d31798msha8dd7877bd6558dp109800jsn25f147783e1b',
                'X-RapidAPI-Host': 'bmi-calculator6.p.rapidapi.com'
            }
        };

            fetch(url, options)
            .then((response) => response.json()) 
            .then((data) => {
                setBMIError("")
                setItems(data)
            })
            .catch(err => console.error(err))
        }
        
    }

    const CalorieCalculator = () => {

        if(Activity === "") {
            setCaloriesError("Kindly select among the options above.")
        } else{
            const url = `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${Activity}&weight=${Pounds}&duration=${Minutes}`;
            const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '244993a79dmsh0fa01b82b28a5dbp1cdc42jsnf77dcbc9e24c',
                'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            fetch(url, options)
            .then((response) => response.json())
            .then((result) => {
                setCaloriesError("")
                setCalories(result)
            })
        } catch (error) {
            console.error(error);
        }
        }
    }

    return (
        <div>
            <article className='BMI' >
                <section>
                    <h1>
                        Body Mass Index Calculator
                    </h1>
                    <p>
                        Body mass index is a measure of body fat based on height and weight that applies to adult men and women. It is a person’s weight in kilograms (or pounds) divided by the square of height in meters (or feet). <br /> A BMI for adult women and men between 18.5 and 24.9 is considered healthy. A BMI lower than 18.5 is considered underweight, whereas a BMI between 25.0 and 29.9 equates with overweight and 30.0 and above with obesity. <br /> BMI screens for weight categories that may lead to health problems, but it does not diagnose the body fatness or health of an individual.
                    </p>
                </section>
                <section>
                    <h3>Enter your details below</h3>
                    <div>
                        <form action="">
                            <h4>Height</h4>
                            <div>
                                <input type="text" name="" id="" placeholder='Enter height in centimetres' value={Height} onChange={handleHeight} 
                                />
                                <p>Centimetres</p>
                            </div>
                        </form>
                        <form action="">
                            <h4>Weight</h4>
                            <div>
                                <input type="text" name="" id="" placeholder='Enter weight in kilograms' value={Weight} onChange={handleWeight} />
                                <p>Kilograms</p>
                            </div>
                        </form> 
                    </div>
                    <span>{BMIError}</span>
                    <button onClick={BMICalculator}>Calculate</button>
                    <div>
                        <h3>BMI Value: <span>{Items.BMI}</span> </h3>
                        <h3>Class: <span>{Items.Class}</span> </h3>
                    </div>
                </section>
            </article>
            <article className='Calories'>
                <section>
                    <h1>
                        Calories Burned
                    </h1>
                    <p>
                    Being active is important for any weight-loss or weight-maintenance program. When you're active, your body uses more energy (calories). And when you burn more calories than you consume, you lose weight.
                    </p>
                    <h4>Benefits of burning calories</h4>
                    <ul>
                        <li>
                            Ensuring your blood vessels stay healthier and lowering your risk of cardiovascular diseases.
                        </li>
                        <li>
                            Protecting you from illnesses like diabetes and helping you control the condition if you already have it.
                        </li>
                        <li>
                            Improving your mood and lowering stress and feelings of anxiety.
                        </li>
                        <li>
                            Helping with weight management.
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Enter your details below</h3>
                    <div>
                    <form action=""> 
                        <h4>Activity</h4>
                        <div>
                            <select name="" id="" value={Activity} onChange={handleActivity} >
                                <option value="">Search among the activities below</option>
                                <option value="skiing">Skiing</option>
                                <option value="Water">Water Activities</option>
                                <option value="Run">Walking/Running</option>
                                <option value="Rope">Jumping Rope</option>
                                <option value="Horse">Horse Riding</option>
                                <option value="Golf">Golf</option>
                                <option value="Calisthenics">Calisthenics</option>
                                <option value="Aerobics">Aerobics</option>
                                <option value="cycling">Cycling</option>
                            </select>
                        </div>
                    </form>
                    <form action="">
                        <h4>Weight</h4>
                        <div>
                            <input type="number" name="" id="" placeholder='Enter weight in pounds' value={Pounds} onChange={handlePounds} />
                            <p>Pounds</p>
                        </div>
                    </form> 
                </div>
                <form action="">
                    <h4>Duration</h4>
                    <div>
                        <input type="number" name="" id="" placeholder='Enter duration' value={Minutes} onChange={handleMinutes} />
                        <p>Minutes</p>
                    </div>
                </form>
                <span>{CaloriesError}</span>
                <button onClick={CalorieCalculator}>Calculate</button>
                {Calories.map((Calorie) => {
                    return (
                        <div>
                            <h5>Activity: {Calorie.name}</h5>
                            <h5>Calories: {Calorie.total_calories}</h5>
                        </div>
                    )
                })
                }
            </section>
        </article>
    </div>
)
}   

export default Fitness
