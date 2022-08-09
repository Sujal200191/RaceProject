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
import AWSMainPage from './screens/AWS-Main-Page';
import ListUsers from './screens/ListUsers';
import ListGroups from './screens/ListGroups';

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
          <Route path="/aws-main-page" element={<AWSMainPage />} />
          <Route path="/list-users" element={<ListUsers />} />
          <Route path="/list-groups" element={<ListGroups />} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
