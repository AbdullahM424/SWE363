
import './App.css';
import Home from "./pages/Home.js";
import Clubs from "./pages/Clubs.js"
import Material from "./pages/MaterialList"

function App() {
  return (
   <div>
    
    {/* <Clubs/> */}
    <Material selectedLayout="Experiences" isAdmin={true} />

   </div>
  );
}

export default App;
