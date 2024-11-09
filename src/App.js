
import './App.css';

import Home from "./pages/Home.js";
import Clubs from "./pages/Clubs.js"
import Material from "./pages/MaterialList"
import Instructors from './pages/Instructors.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginFormm from './pages/LoginForm.js';
import SingupForm from './pages/SingupForm.js';
import ClubsProfile from './pages/ClubsProfile.js'
import FacilitiesList from './pages/Facilities.js'
import Error404 from './pages/Error404.js'
function App() {//the root if the application, sees all the changes in the url
  return (
   <div>
   
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />}> </Route>
        <Route path ="/clubs" element = {<Clubs></Clubs>}></Route>
        <Route path = "/instructors" element={<Instructors></Instructors>}></Route>

      </Routes>
    </Router>

   </div>

  );
}
// Experiences
// Old Exams
// Slides Notes
export default App;
