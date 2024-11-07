
import './App.css';
import Home from "./pages/Home.js";
import Clubs from "./pages/Clubs.js"
import Material from "./pages/MaterialList"
import Instructors from './pages/Instructors.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginFormm from './pages/LoginForm.js';
import SingupForm from './pages/SingupForm.js';
function App() {//the root if the application, sees all the changes in the url
  return (
   <div>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home></Home>}> </Route>
        <Route path ="/clubs" element = {<Clubs></Clubs>}></Route>
        <Route path = "/instructors" element={<Instructors></Instructors>}></Route>
      </Routes>
    </Router> */
 
    <Instructors></Instructors>

   </div>
  );
}

export default App;
