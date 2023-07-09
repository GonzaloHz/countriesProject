import { Route, Routes } from "react-router-dom";

import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return(
  <div className="overflow-hidden">
    <Navbar />
    <Routes>
      <Route path='' element={<Home />} />
    </Routes>
  </div>
  )
}

export default App;