import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import "./styles.css"

import App from './App';
import Landing from './Components/Landing/Landing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);