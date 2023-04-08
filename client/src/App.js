import Landing from "./Scenes/Landing";
import Maker from "./Scenes/Maker";
import Consumer from "./Scenes/Consumer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="App">  
    <Routes>
      <Route path='/' element={<Landing />} />

      <Route path='/maker' element={<Maker />} />

      <Route path='/consumer' element={<Consumer />} />
      
    </Routes>
 
    </main>
  );
}

export default App;
