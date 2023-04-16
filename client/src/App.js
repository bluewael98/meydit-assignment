import Landing from "./Scenes/Landing";
import Maker from "./Scenes/Maker";
import Navbar from "./Scenes/Navbar";
import Consumer from "./Scenes/Consumer";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";
  return (
    
    <main className="App">  
    {showNavbar && <Navbar />}
    <Routes>
      <Route path='/' element={<Landing />} />
      
      <Route path='/maker' element={<Maker />} />

      <Route path='/consumer' element={<Consumer />} />
      
    </Routes>
 
    </main>
  );
}

export default App;
