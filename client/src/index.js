import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './Redux/Store/store';

import App from './App';
import Landing from './Components/Landing/Landing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);