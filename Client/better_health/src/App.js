import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { useGetUserID } from "./Components/Hooks/UseGetUserID.js";
import Header from './Components/Header/Header';
import Home from "./Pages/Home/Home.jsx";
import Exercise from "./Pages/Exercise/Exercise.jsx";
import Nutrition from "./Pages/Nutrition/Nutrition.jsx";
import Recipe from "./Pages/Recipe/Recipe.jsx";
import Information from "./Pages/Information/Information.jsx";
import Fitness from "./Pages/Fitness/Fitness.jsx";
import Favourites from './Pages/Favourites/Favourites.jsx';
import Customise from './Pages/Customise/Customise';
import Register from './Pages/User/Register/Register.jsx';
import Login from './Pages/User/Login/Login.jsx';
import Profile from './Pages/User/Profile/Profile.jsx';
import Details from './Pages/Details/Details.jsx';
import Workout from './Pages/Workout/Workout.jsx';
import WorkoutDetails from './Pages/WorkoutDetails/WorkoutDetails.jsx';
import EditDetails from './Pages/User/EditDetails/EditDetails.jsx';
import Edit from './Pages/Edit/Edit.jsx';
import DeleteProfile from './Pages/User/DeleteProfile/DeleteProfile.jsx';

function App() {

  const ID = useGetUserID()

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Exercise' element={ID ? <Exercise /> : <Navigate to="/" />} />
        <Route path='/Workout/:id' element={<Details />} />
        <Route path='/Nutrition' element={ID ? <Nutrition /> : <Navigate to="/" /> } />
        <Route path='/Recipe' element={ID ? <Recipe /> : <Navigate to="/" />} />
        <Route path='/Meal/:idMeal' element={ID ? <Information /> : <Navigate to="/" />} />
        <Route path='/Fitness_Calculator' element={ID ? <Fitness /> : <Navigate to="/" /> } />
        <Route path='/Favourites' element={ID ? <Favourites /> : <Navigate to="/" /> } />
        <Route path='/Customise' element={ID ? <Customise /> : <Navigate to="/" /> } />
        <Route path='/Edit/:_id' element={<Edit />} />
        <Route path='/Workout' element={ ID ? <Workout /> : <Navigate to="/" />} />
        <Route path='/WorkoutDetails/:_id' element={<WorkoutDetails />} />
        <Route path='/Registration' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/DeleteProfile' element={<DeleteProfile />} />
        <Route path='/MyProfile/:userID' element={<EditDetails />} />
        <Route path='/Profile/:userID' element={ ID ? <Profile/> : <Navigate to="/" /> } />
      </Routes>
    </div>
  );
}

export default App;
