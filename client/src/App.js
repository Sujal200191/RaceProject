import React from 'react';
// import logo from './logo.svg';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";

// import Home from './screens/Home';

import Landing from './screens/Landing';
import Register from './screens/Register';
import Login from './screens/Login';
import Footer from './screens/Footer';
import MainPage from './screens/MainPage';
import Services from './screens/Services';

import './App.scss';

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
