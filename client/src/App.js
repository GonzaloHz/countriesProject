import { Route, Routes } from "react-router-dom";

import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import CardDetail from './Components/CardDetail/CardDetail';

function App() {
  return(
  <div className="overflow-hidden">
    <Navbar />
    <Routes>
      <Route path='/home/:id' element={<CardDetail />}/>
      <Route path='/home' element={<Home />} />
    </Routes>
  </div>
  )
}

export default App;