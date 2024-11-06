
import './App.css';
import Home from "./pages/Home.js";
import Clubs from "./pages/Clubs.js"
import Material from "./pages/MaterialList"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {//the root if the application, sees all the changes in the url
  return (
   <div>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home></Home>}> </Route>
        <Route path ="/clubs" element = {<Clubs></Clubs>}></Route>
      </Routes>
    </Router>

   </div>
  );
}

export default App;
